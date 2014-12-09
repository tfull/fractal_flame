package fractal

import java.util.Random
import java.util.Scanner
import java.io._

object Render{
    def makeWeights(n: Int) : Array[Double] = {
        val random = new Random()
        var weights = new Array[Double](n)
        var ws = new Array[Int](n)

        var s: Int = 0
        for(i <- 0 until n){
            ws(i) = random.nextInt(10)
            s += ws(i)
        }
        if(s > 0){
            for(i <- 0 until n){
                weights(i) = ws(i).toDouble / s
            }
            weights
        }else{
            makeWeights(n)
        }
    }

    def makeProbabilities(n: Int) : (Array[Range], Int) = {
        val random = new Random()
        var v = 0
        var ps = new Array[Range](n)
        for(i <- 0 until n){
            var x = random.nextInt(10) + 1
            ps(i) = Range(v, v + x)
            v += x
        }
        (ps, v)
    }

    def nextIndex(rs: Array[Range], x: Int) : Int = {
        var res = -1
        var i = 0
        for(r <- rs){
            if(r contains x){ res = i }
            i += 1
        }
        res
    }

    def render(args: Array[String]){
        var n = 10
        var (width, height) = (480, 480)
        var density = 3
        var repeat: Long = 100000L
        var xa = (-1.0, 1.0)
        var ya = (1.0, -1.0)
        var background: Color = new Color()

        val random: Random = new Random()
        
        var functions = Function.randomMakeN(n)
        var colors = Color.randomColors(n)
        var cls: List[Color] = List()
        var vars = Variation.variations
        var weights = makeWeights(vars.length)

        val buffer = new BufferedReader(new InputStreamReader(System.in))

        try{
            var line = buffer.readLine()

            while(line != null){

                val sc = new Scanner(line)
                sc.next() match{
                    case "variations" => {
                        var vs = List[Point => Point]()
                        while(sc.hasNextInt()){
                            var ni = sc.nextInt()
                            if(ni >= 0 && ni < Variation.variations.length){
                                vs ::= Variation.variations(ni)
                            }else{
                                throw new IOException()
                            }
                        }
                        vars = vs.reverse.toArray
                        weights = makeWeights(vars.length)
                    }
                    case "N" => {
                        n = sc.nextInt()
                        functions = Function.randomMakeN(n)
                        colors = Color.randomColors(n)
                    }
                    case "colors" => {
                        var cs = List[Color]()
                        while(sc.hasNextDouble()){
                            var r = sc.nextDouble()
                            var g = sc.nextDouble()
                            var b = sc.nextDouble()
                            cs ::= new Color(r, g, b)
                        }
                        colors = cs.reverse.toArray
                        n = colors.length
                        functions = Function.randomMakeN(n)
                    }
                    case "color" => {
                        var r = sc.nextDouble()
                        var g = sc.nextDouble()
                        var b = sc.nextDouble()
                        cls ::= new Color(r, g, b)
                    }
                    case "repeat" => {
                        repeat = sc.nextLong()
                    }
                    case "density" => {
                        density = sc.nextInt()
                    }
                    case "size" => {
                        var size = sc.nextInt()
                        width = size
                        height = size
                    }
                    case "background" => {
                        var r = sc.nextDouble()
                        var g = sc.nextDouble()
                        var b = sc.nextDouble()
                        background = new Color(r, g, b)
                    }
                    case "#" => {
                    }
                }

                line = buffer.readLine()
            }
        }catch{
            case e: IOException => System.err.println("[Error]: IOException")
            System.exit(1)
        }

        if(cls.length > 0){
            colors = cls.reverse.toArray
            n = colors.length
            functions = Function.randomMakeN(n)
        }

        val image = new Image(width, height, density, xa, ya, background)
        val vws = vars.zip(weights)
        var point = new Point(random.nextDouble(), random.nextDouble())
        val (ps, mv) = makeProbabilities(n)

        var i: Long = 0L
        while(i < repeat){
            val r = nextIndex(ps, random.nextInt(mv)) //random.nextInt(n)
            val f = functions(r)
            point = f(vws, point)
            if(i > 20L){
                image.blend(point, colors(r))
            }
            i = i + 1L
        }

        image.printP3()
    }
}
