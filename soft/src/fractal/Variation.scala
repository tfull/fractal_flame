package fractal

import scala.collection.mutable
import scala.math._

object Variation{
    val parameters: mutable.Map[String,Double] = mutable.Map()

    def initializeParameters(){
        parameters += "a" -> 0.0
        parameters += "b" -> -0.1
        parameters += "c" -> -0.42
        parameters += "d" -> 0.0
        parameters += "e" -> 0.8
        parameters += "f" -> 0.5
        parameters += "Omega" -> 0.0
        parameters += "blob.high" -> 1.0
        parameters += "blob.low" -> 0.5
        parameters += "blob.waves" -> 5.0
        parameters += "pdj.a" -> 0.7
        parameters += "pdj.b" -> 0.3
        parameters += "pdj.c" -> 0.6
        parameters += "pdj.d" -> 0.1
        parameters += "fan2.x" -> 0.8
        parameters += "fan2.y" -> 1.0
        parameters += "rings2.val" -> 0.5
        parameters += "perspective.angle" -> 0.5
        parameters += "perspective.dist" -> 2.0
        parameters += "juliaN.power" -> 2.0
        parameters += "juliaN.dist" -> 2.0
        parameters += "v36" -> 1.5
        parameters += "radialBlur.angle" -> 1.2
        parameters += "pie.slices" -> 5.0
        parameters += "pie.rotation" -> 0.2
        parameters += "pie.thickness" -> 0.2
        parameters += "ngon.power" -> 2.0
        parameters += "ngon.sides" -> 0.3
        parameters += "ngon.corners" -> 0.3
        parameters += "curl.c1" -> 0.4
        parameters += "curl.c2" -> 0.6
        parameters += "rectangles.x" -> 0.8
        parameters += "rectangles.y" -> 0.4
        parameters += "v41" -> 1.0
        parameters += "v44" -> 3.0
        parameters += "v45" -> 2.0
        parameters += "v46" -> 2.0
        parameters += "v47" -> 2.0
    }

    def setParameter(s: String, t: String){
        if(s == "Omega"){
            if(t == "pi"){
                parameters("Omega") = Pi
            }else{
                parameters("Omega") = 0.0
            }
        }else if(parameters.contains(s)){
            parameters(s) = t.toDouble
        }else{
            System.err.println("no such variable: " + s)
        }
    }    

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
