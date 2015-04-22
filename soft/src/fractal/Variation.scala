package fractal

import scala.math._

object Variation{
    def v0(p: Point) = p
    def v1(p: Point) = new Point(sin(p.x), sin(p.y))
    def v2(p: Point) = p / p.r2()
    def v3(p: Point) = {
        val (x, y) = (p.x, p.y)
        val r2 = p.r2()
        new Point(x*sin(r2)-y*cos(r2), x*cos(r2)+y*sin(r2))
    }
    def v4(p: Point) = {
        val (x, y) = (p.x, p.y)
        new Point((x-y)*(x+y), 2*x*y) / p.r()
    }
    def v5(p: Point) = new Point(p.theta() / Pi, p.r() - 1)
    def v6(p: Point) = {
        val (r, theta) = (p.r(), p.theta())
        new Point(sin(theta+r), cos(theta-r)) * r
    }
    def v7(p: Point) = {
        val (r, theta) = (p.r(), p.theta())
        new Point(sin(theta*r), -cos(theta*r)) * r
    }
    def v8(p: Point) = {
        val r = p.r()
        new Point(sin(Pi*r), cos(Pi*r)) * (p.theta()/Pi)
    }
    def v9(p: Point) = {
        val (r, theta) = (p.r(), p.theta())
        new Point(cos(theta)+sin(r), sin(theta)-cos(r)) / r
    }
    def v10(p: Point) = {
        val (r, theta) = (p.r(), p.theta())
        new Point(sin(theta)/r, r*cos(theta))
    }
    def v11(p: Point) = {
        val (r, theta) = (p.r(), p.theta())
        new Point(sin(theta)*cos(r), cos(theta)*sin(r))
    }
    def v12(p: Point) = {
        val (r, theta) = (p.r(), p.theta())
        val p0 = sin(theta+r)
        val p1 = cos(theta-r)
        val p03 = p0 * p0 * p0
        val p13 = p1 * p1 * p1
        new Point(p03+p13, p03-p13) * r
    }

    val variations: Array[Point => Point] = Array(v0,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12)
}
