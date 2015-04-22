package fractal

import scala.collection.mutable.Map

object Main{
    def main(args: Array[String]){
        var index: Int = 0
        var log_name: String = null

        while(index < args.length){
            if(args(index) == "-log"){
                index += 1
                if(index >= args.length){
                    argumentError("no argument for -log")
                }
                log_name = args(index)
            }else{
                argumentError("no such option")
            }
            index += 1
        }

        Render.render(log_name)
    }

    def argumentError(s: String){
        System.err.println("[Argument Error]: " + s)
        System.exit(1)
    }
}