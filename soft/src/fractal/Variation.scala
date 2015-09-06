package fractal

import java.util.Random
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
        parameters += "juliaScope.power" -> 2.0
        parameters += "juliaScope.dist" -> 2.0
        parameters += "v36" -> 1.5
        parameters += "radialBlur.angle" -> 1.2
        parameters += "pie.slices" -> 5.0
        parameters += "pie.rotation" -> 0.2
        parameters += "pie.thickness" -> 0.2
        parameters += "ngon.power" -> 2.0
        parameters += "ngon.sides" -> 0.3
        parameters += "ngon.corners" -> 0.3
        parameters += "ngon.circle" -> 0.4
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

    def psi(): Double = math.random

    def lambda(): Double = (new Random().nextInt(2) * 2 - 1).toDouble

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

    def v13(p: Point) = {
        val (r, theta) = (p.r(), p.theta())
        val o = parameters("Omega")
        new Point(cos(theta / 2.0 + o), sin(theta / 2.0 + o)) * sqrt(r)
    }

    def v14(p: Point) = {
        if(p.x >= 0.0){
            if(p.y >= 0.0){
                p
            }else{
                new Point(p.x, p.y / 2.0)
            }
        }else{
            if(p.y >= 0.0){
                new Point(p.x * 2.0, p.y)
            }else{
                new Point(p.x * 2.0, p.y / 2.0)
            }
        }
    }

    def v15(p: Point) = {
        val b = parameters("b")
        val c = parameters("c")
        val e = parameters("e")
        val f = parameters("f")
        new Point(p.x + b * sin(p.y / (c * c)), p.y + e * sin(p.x / (f * f)))
    }

    def v16(p: Point) = new Point(p.y, p.x) * (2.0 / (p.r() + 1.0))

    def v17(p: Point) = {
        val c = parameters("c")
        val f = parameters("f")
        new Point(p.x + c * sin(tan(3.0 * p.y)), p.y + f * sin(tan(3.0 * p.x)))
    }

    def v18(p: Point) = {
        val piy = Pi * p.y
        new Point(cos(piy), sin(piy)) * exp(p.x - 1.0)
    }

    def v19(p: Point) = {
        val (r, theta) = (p.r(), p.theta())
        val sint = sin(theta)
        new Point(cos(theta), sint) * pow(r, sint)
    }

    def v20(p: Point) = {
        val pix = Pi * p.x
        new Point(cos(pix) * cosh(p.y), -sin(pix) * sinh(p.y))
    }

    def v21(p: Point) = {
        val c2 = pow(parameters("c"), 2.0)
        val (r, theta) = (p.r(), p.theta())
        new Point(cos(theta), sin(theta)) * ((r + c2) % (2.0 * c2) - c2 + r * (1 - c2))
    }

    def v22(p: Point) = {
        val t = Pi * pow(parameters("c"), 2.0)
        val (r, theta) = (p.r(), p.theta())
        if((theta + parameters("f")) % t > t / 2.0){
            val k = theta - t / 2.0
            new Point(cos(k), sin(k)) * r
        }else{
            val k = theta + t / 2.0
            new Point(cos(k), sin(k)) * r
        }
    }

    def v23(p: Point) = {
        val p1 = parameters("blob.high")
        val p2 = parameters("blob.low")
        val p3 = parameters("blob.waves")
        val (r, theta) = (p.r(), p.theta())
        new Point(cos(theta), sin(theta)) * (r * (p2 + ((p1 - p2) / 2.0) * (sin(p3 * theta) + 1.0)))
    }

    def v24(p: Point) = {
        val p1 = parameters("pdj.a")
        val p2 = parameters("pdj.b")
        val p3 = parameters("pdj.c")
        val p4 = parameters("pdj.d")
        new Point(sin(p1 * p.y) - cos(p2 * p.x), sin(p3 * p.x) - cos(p4 * p.y))
    }

    def v25(p: Point) = {
        val p1 = Pi * pow(parameters("fan2.x"), 2.0)
        val p2 = parameters("fan2.y")
        val (r, theta) = (p.r(), p.theta())
        val t = theta + p2 - p1 * (2.0 * theta * p2 / p1).toInt.toDouble
        if(t > p1 / 2.0){
            val k = theta - p1 / 2.0
            new Point(sin(k), cos(k)) * r
        }else{
            val k = theta + p1 / 2.0
            new Point(sin(k), cos(k)) * r
        }
    }

    def v26(p: Point) = {
        val pr = pow(parameters("rings2.val"), 2.0)
        val (r, theta) = (p.r(), p.theta())
        val t = r - 2.0 * pr * ((r + pr) / (2.0 * pr)).toInt.toDouble + r * (1.0 - pr)
        new Point(sin(theta), cos(theta)) * t
    }

    def v27(p: Point) = p * (2.0 / (p.r() + 1.0))

    def v28(p: Point) = p * (4.0 / (p.r2() + 4.0))

    def v29(p: Point) = new Point(sin(p.x), p.y)

    def v30(p: Point) = {
        val p1 = parameters("perspective.angle")
        val p2 = parameters("perspective.dist")
        new Point(p.x, p.y * cos(p1)) * (p2 / (p2 - p.y * sin(p1)))
    }

    def v31(p: Point) = {
        val ps = psi()
        val q = 2.0 * Pi * psi()
        new Point(p.x * cos(q), p.y * sin(q)) * ps
    }

    def v32(p: Point) = {
        val p1 = parameters("juliaN.power")
        val p2 = parameters("juliaN.dist")
        val p3 = (abs(p1) * psi()).toInt.toDouble
        val t = (p.phi() + 2.0 * Pi * p3) / p1
        new Point(cos(t), sin(t)) * pow(p.r(), p2 / p1)
    }

    def v33(p: Point) = {
        val p1 = parameters("juliaScope.power")
        val p2 = parameters("juliaScope.dist")
        val p3 = (abs(p1) * psi()).toInt.toDouble
        val t = (lambda() * p.phi() + 2.0 * Pi * p3) / p1
        new Point(cos(t), sin(t)) * pow(p.r(), p2 / p1)
    }

    def v34(p: Point) = {
        val q = 2.0 * Pi * psi()
        new Point(cos(q), sin(q)) * psi()
    }

    def v35(p: Point) = {
        var sum = -2.0
        for(i <- 1 to 4){
            sum += psi()
        }
        val q = 2.0 * Pi * psi()
        new Point(cos(q), sin(q)) * sum
    }

    def v36(p: Point) = {
        val r = p.r()
        val p1 = parameters("radialBlur.angle") * Pi / 2.0
        val v36c = parameters("v36")
        var sum = -2.0
        for(i <- 1 to 4){
            sum += psi()
        }
        val t1 = v36c * sum
        val t2 = p.phi() + t1 * sin(p1)
        val t3 = t1 * cos(p1) - 1.0
        new Point(r * cos(t2) + t3 * p.x, r * sin(t2) + t3 * p.y) / v36c
    }

    def v37(p: Point) = {
        val p1 = parameters("pie.slices")
        val p2 = parameters("pie.rotation")
        val p3 = parameters("pie.thickness")
        val t1 = (psi() * p1 + 0.5).toInt.toDouble
        val t2 = p2 + (2.0 * Pi / p1) * (t1 + psi() * p3)
        new Point(cos(t2), sin(t2)) * psi()
    }

    def v38(p: Point) = {
        val phi = p.phi()
        val p1 = parameters("ngon.power")
        val p2 = 2.0 * Pi / parameters("ngon.sides")
        val p3 = parameters("ngon.corners")
        val p4 = parameters("ngon.circle")
        val t3 = phi - p2 * (phi / p2).floor
        val t4 = if(t3 > p2 / 2.0){ t3 }else{ t3 - p2 }
        val k = (p3 * (1.0 / cos(t4) - 1.0)) / pow(p.r(), p1)
        p * k
    }

    def v39(p: Point) = {
        val p1 = parameters("curl.c1")
        val p2 = parameters("curl.c2")
        val t1 = 1.0 + p1 * p.x + p2 * (p.x * p.x - p.y * p.y)
        val t2 = p1 * p.y + 2.0 * p2 * p.x * p.y
        new Point(p.x * t1 + p.y * t2, p.y * t1 - p.x * t2) / (t1 * t1 + t2 * t2)
    }

    def v40(p: Point) = {
        val p1 = parameters("rectangles.x")
        val p2 = parameters("rectangles.y")
        new Point((2.0 * (p.x / p1).floor + 1.0) * p1 - p.x, (2.0 * (p.y / p2).floor + 1.0) * p2 - p.y)
    }

    def v41(p: Point) = {
        val k = psi() * Pi * parameters("v41")
        val sk = sin(k)
        new Point(sk, sk * tan(k))
    }

    def v42(p: Point) = new Point(sin(p.x) / cos(p.y), tan(p.y))

    def v43(p: Point) = new Point(psi() - 0.5, psi() - 0.5)

    def v44(p: Point) = {
        val v44c = parameters("v44")
        new Point(cos(p.x), sin(p.y)) * ((v44c * tan(psi() * Pi * v44c)) / p.r2())
    }

    def v45(p: Point) = {
        val k = psi() * p.r() * parameters("v45")
        new Point(cos(k) + sin(k), cos(k) - sin(k)) * p.x
    }

    def v46(p: Point) = {
        val v46c = parameters("v46")
        new Point(p.x, 1.0 / (v46c * cos(v46c * p.r())))
    }

    def v47(p: Point) = {
        val k = psi() * p.r() * parameters("v47")
        val t = log10(pow(sin(k), 2.0)) + cos(k)
        new Point(t, t - Pi * sin(k)) * p.x
    }

    def v48(p: Point) = {
        p * sqrt(1.0 / pow(p.x * p.x - p.y * p.y, 2.0))
    }

    val variations: Array[Point => Point] = Array(v0,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16,v17,v18,v19,v20,v21,v22,v23,v24,v25,v26,v27,v28,v29,v30,v31,v32,v33,v34,v35,v36,v37,v38,v39,v40,v41,v42,v43,v44,v45,v46,v47,v48)
}
