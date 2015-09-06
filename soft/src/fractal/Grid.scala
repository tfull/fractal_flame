package fractal

import java.io._
import java.util.Scanner

object Grid{
    def main(args: Array[String]){
        if(args.length < 1 || args.length > 2){
            System.err.println("wrong number of arguments")
        }

        val n: Int = args(0).toInt
        var k: Double = 1.0
        if(args.length == 2){
            k = args(1).toDouble
        }
        val xa: Array[Double] = Array(- k, k)
        val ya: Array[Double] = Array(k, - k)
        val size: Int = 480
        val grid: Int = 48
        val d: Int = 4

        Variation.initializeParameter()

        val buffer = new BufferedReader(new InputStreamReader(System.in))
        var line: String = buffer.readLine()

        while(line != null){
            val sc: Scanner = new Scanner(line)
            val s: String = sc.next()
            val t: String = sc.next()
            Variation.setParameter(s, t)
            line = buffer.readLine()
        }

        val variation: (Point => Point) = Variation.variations(n)

        val image: Array[Array[Boolean]] = Array.ofDim(size, size)

        for(i <- 0 until size){
            for(j <- 0 until size){
                image(i)(j) = true
            }
        }

        for(i <- 0 to grid){
            for(j <- 0 until (d * size)){
                val x: Double = j.toDouble / (d * size) * (xa(1) - xa(0)) + xa(0)
                val y: Double = i.toDouble / grid * (ya(1) - ya(0)) + ya(0)
                val p: Point = variation(new Point(x, y))
                val ix: Int = ((p.x - xa(0)) / (xa(1) - xa(0)) * size.toDouble).toInt
                val iy: Int = ((p.y - ya(0)) / (ya(1) - ya(0)) * size.toDouble).toInt
                if(ix >= 0 && ix < size && iy >= 0 && iy < size){
                    image(iy)(ix) = false
                }
            }
        }

        for(j <- 0 to grid){
            for(i <- 0 until (d * size)){
                val x: Double = j.toDouble / grid * (xa(1) - xa(0)) + xa(0)
                val y: Double = i.toDouble / (d * size) * (ya(1) - ya(0)) + ya(0)
                val p: Point = variation(new Point(x, y))
                val ix: Int = ((p.x - xa(0)) / (xa(1) - xa(0)) * size.toDouble).toInt
                val iy: Int = ((p.y - ya(0)) / (ya(1) - ya(0)) * size.toDouble).toInt
                if(ix >= 0 && ix < size && iy >= 0 && iy < size){
                    image(iy)(ix) = false
                }
            }
        }

        println("P3")
        println(size.toString + " " + size.toString)
        println(255)

        for(i <- 0 until size){
            for(j <- 0 until size){
                if(image(i)(j)){
                    println("255 255 255")
                }else{
                    println("0 0 0")
                }
            }
        }
    }
}