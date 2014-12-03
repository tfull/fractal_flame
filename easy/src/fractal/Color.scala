package fractal

import java.util.Random

class Color(val r: Double = 0, val g: Double = 0, val b: Double = 0){
    def +(c: Color) = new Color(r + c.r, g + c.g, b + c.b)
    def /(k: Double) = new Color(r / k, g / k, b / k)
}

object Color{
    val palette: Array[Color] = Array(new Color(1.0, 0.0, 0.0), new Color(1.0, 0.5, 0.0), new Color(1.0, 0.0, 0.5), new Color(1.0, 0.0, 1.0), new Color(1.0, 1.0, 0.0), new Color(0.0, 1.0, 0.0), new Color(0.5, 1.0, 0.0), new Color(0.0, 1.0, 0.5), new Color(0.0, 0.0, 1.0), new Color(0.5, 0.0, 1.0), new Color(0.0, 0.5, 1.0))

    def randomColors(n: Int) : Array[Color] = {
        val r = new Random()
        var a = new Array[Color](n)
        for(i <- 0 until n){
            a(i) = palette(r.nextInt(palette.length))
        }
        a
    }
}
