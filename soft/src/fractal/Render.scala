package fractal

import java.util.Random
import java.util.Scanner
import java.io._

object Render{
    def makeWeights(n: Int) : (Array[Double], Array[Int]) = {
        val random = new Random()
        var weights = new Array[Double](n)
        var ws = new Array[Int](n)

        var s: Int = 0
        for(i <- 0 until n){
            ws(i) = random.nextInt(9) + 1
            s += ws(i)
        }
        if(s > 0){
            for(i <- 0 until n){
                weights(i) = ws(i).toDouble / s
            }
            (weights, ws)
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

    def render(log_name: String){
        var n = 10
        var (width, height) = (480, 480)
        var density = 3
        var repeat: Long = 100000L
        var xaxis = (-1.0, 1.0)
        var yaxis = (1.0, -1.0)
        var background: Color = new Color()

        val random: Random = new Random()
        
        var functions = Function.randomMakeN(n)
        var colors = Color.randomColors(n)
        var cls: List[Color] = List()
        var vars = Variation.variations
        var (weights, ws) = makeWeights(vars.length)
        var varns: Array[Int] = Array()

        Variation.initializeParameters()

        val buffer = new BufferedReader(new InputStreamReader(System.in))

        try{
            var line = buffer.readLine()

            while(line != null){

                val sc = new Scanner(line)
                sc.next() match{
                    case "variations" => {
                        var vs = List[Point => Point]()
                        var vns = List[Int]()
                        while(sc.hasNextInt()){
                            var ni = sc.nextInt()
                            if(ni >= 0 && ni < Variation.variations.length){
                                vs ::= Variation.variations(ni)
                                vns ::= ni
                            }else{
                                throw new IOException()
                            }
                        }
                        vars = vs.reverse.toArray
                        var (weights_, ws_) = makeWeights(vars.length)
                        weights = weights_
                        ws = ws_
                        varns = vns.reverse.toArray
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
                    case "parameter" => {
                        val s = sc.next()
                        val t = sc.next()
                        Variation.setParameter(s, t)
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

        val image = new Image(width, height, density, xaxis, yaxis, background)
        val vws = vars.zip(weights)
        var point = new Point(random.nextDouble(), random.nextDouble())
        val (ps, mv) = makeProbabilities(n)

        if(log_name != null){
            val log_writer: BufferedWriter = new BufferedWriter(new FileWriter(log_name))

            val (xa, xb) = xaxis
            val (ya, yb) = yaxis

            log_writer.write("repeat %d\n".format(repeat))
            log_writer.write("width %d\n".format(width))
            log_writer.write("height %d\n".format(height))
            log_writer.write("density %d\n".format(density))
            log_writer.write("xaxis %.3f %.3f \n".format(xa, xb))
            log_writer.write("yaxis %.3f %.3f \n".format(ya, yb))
            log_writer.write("background %.3f %.3f %.3f\n".format(background.r, background.g, background.b))
            for(i <- 0 until colors.length){
                log_writer.write("function %d %.3f %.3f %.3f %.3f %.3f %.3f %.3f %.3f %.3f\n".format(ps(i).length, colors(i).r, colors(i).g, colors(i).b, functions(i).a, functions(i).b, functions(i).c, functions(i).d, functions(i).e, functions(i).f))
            }
            for(i <- 0 until ws.length){
                log_writer.write("variation %d %d\n".format(varns(i), ws(i)))
            }
            for(k <- Variation.parameters.keys){
                if(k == "Omega"){
                    if(Variation.parameters(k) > 0.0){
                        log_writer.write("parameter Omega pi\n")
                    }else{
                        log_writer.write("parameter Omega 0.0\n")
                    }
                }else{
                    log_writer.write("parameter %s %.3f\n".format(k, Variation.parameters(k)))
                }
            }

            log_writer.close()
        }

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
