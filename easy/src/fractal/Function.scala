package fractal

import java.util.Random
import scala.math

class Function(val a: Double, val b: Double, val c: Double, val d: Double, val e: Double, val f: Double){
    def apply(vws: Array[(Point => Point, Double)], p: Point) : Point = {
        var point = new Point(0, 0)
        val (x, y) = (p.x, p.y)
        for((v, w) <- vws){
            point += v(new Point(a * x + b * y + c, d * x + e * y + f)) * w
        }
        point
    }
}

object Function{
    def randomMake() : Function = {
        val random: Random = new Random()
        var a: Array[Int] = new Array[Int](6)
        var s: Int = 0
        var t: Int = 0

        for(i <- 0 until 3){
            a(i) = random.nextInt(21) - 10
            s += math.abs(a(i))
        }
        for(i <- 0 until 3){
            a(i + 3) = random.nextInt(21) - 10
            t += math.abs(a(i + 3))
        }

        if(s != 0 && t != 0){
            val u: Double = s.toDouble
            val v: Double = t.toDouble
            new Function(a(0)/u, a(1)/u, a(2)/u, a(3)/v, a(4)/v, a(5)/v)
        }else{
            randomMake()
        }
    }

    def randomMakeN(n: Int) : Array[Function] = {
        var a = new Array[Function](n)
        for(i <- 0 until n){
            a(i) = randomMake()
        }
        a
    }
}
