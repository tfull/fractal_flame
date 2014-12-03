package fractal

import scala.math._

class Point(val x: Double, val y: Double){
    def +(p: Point) = new Point(x + p.x, y + p.y)
    def *(k: Double) = new Point(x * k, y * k)
    def /(k: Double) = new Point(x / k, y / k)
    def theta() : Double = atan2(x, y)
    def phi() : Double = atan2(y, x)
    def r() : Double = sqrt(r2())
    def r2() : Double = x * x + y * y
}
