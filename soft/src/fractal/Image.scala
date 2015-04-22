package fractal

import scala.math

class Image(val width: Int, val height: Int, val density: Int, val xaxis: (Double, Double), val yaxis: (Double, Double), val background: Color){
    private val (x0, x1) = xaxis
    private val (y0, y1) = yaxis
    private val d_width: Int = width * density
    private val d_height: Int = height * density

    private var image: Array[Array[Color]] = Array.ofDim[Color](d_height, d_width)
    private var frequency: Array[Array[Long]] = Array.ofDim[Long](d_height, d_width)

    for(i <- 0 until d_height){
        for(j <- 0 until d_width){
            image(i)(j) = background
        }
    }

    def blend(p: Point, c: Color){
        val (x, y) = (p.x, p.y)
        val (xmin, xmax) = (math.min(x0, x1), math.max(x0, x1))
        val (ymin, ymax) = (math.min(y0, y1), math.max(y0, y1))
        if(x < xmin || x > xmax || y < ymin || y > ymax){ return }

        var ix: Int = {
            var dx = ((x - x0) / (x1 - x0) * d_width).toInt
            if(dx < 0){
                0
            }else if(dx > d_width - 1){
                d_width - 1
            }else{
                dx
            }
        }
        var iy: Int = {
            var dy = ((y - y0) / (y1 - y0) * d_height).toInt
            if(dy < 0){
                0
            }else if(dy > d_height - 1){
                d_height - 1
            }else{
                dy
            }
        }

        image(iy)(ix) = (c + image(iy)(ix)) / 2
        frequency(iy)(ix) += 1L
    }

    def adjust(k: Double){
        for(i <- 0 until d_height){
            for(j <- 0 until d_width){
                image(i)(j) /= k
            }
        }
    }

    def printP3(){
        val gamma: Double = 2.2
        var max_f: Long = 1L

        for(i <- 0 until d_height){
            for(j <- 0 until d_width){
                if(frequency(i)(j) > max_f){
                    max_f = frequency(i)(j)
                }
            }
        }

        println("P3")
        println("#")
        println(width + " " + height)
        println(255)

        for(i <- 0 until height){
            for(j <- 0 until width){
                var c: Color = new Color()
                var f: Long = 0L

                for(di <- 0 until density){
                    for(dj <- 0 until density){
                        c += image(i * density + di)(j * density + dj)
                        f += frequency(i * density + di)(j * density + dj)
                    }
                }

                c /= density * density

                if(f > 0L){
                    val favg: Double = math.log(f.toDouble / (density * density).toDouble)
                    if(favg <= 0.0){
                        c = new Color()
                    }else{
                        var alpha: Double = favg / math.log(max_f)
                        c *= math.pow(alpha, (1.0 / gamma))
                    }
                }

                println("%d %d %d".format(Image.reform(c.r), Image.reform(c.g), Image.reform(c.b)))
            }
        }
    }
}

object Image{
    def reform(x: Double) : Int = {
        var t = if(x < 0){
            0
        }else if(x > 1){
            1
        }else{
            x
        }
        (t * 255.0 + 0.5).toInt
    }
}
