library(MASS)

getLine <- function(f){
    while(TRUE){
        s <- readLines(con=f, 1)
        if(is.na(match("#", substring(s, 1, 1)))){
            return(s)
        }
    }
}

main <- function(){
    in_ppm <- file(commandArgs(trailingOnly=TRUE)[1], "r")
    p3 <- getLine(in_ppm)
    wh <- strsplit(getLine(in_ppm), "\\s+")
    width <- as.numeric(wh[[1]][1])
    height <- as.numeric(wh[[1]][2])
    tmp <- getLine(in_ppm)

    red.x <- NULL
    red.y <- NULL
    green.x <- NULL
    green.y <- NULL
    blue.x <- NULL
    blue.y <- NULL

    for(i in 1:height){
        for(j in 1:width){
            rgb <- strsplit(getLine(in_ppm), "\\s+")

            r <- as.numeric(rgb[[1]][1])
            g <- as.numeric(rgb[[1]][2])
            b <- as.numeric(rgb[[1]][3])

            red.x <- append(red.x, rep(i - 0.5, r))
            red.y <- append(red.y, rep(j - 0.5, r))
            green.x <- append(green.x, rep(i - 0.5, g))
            green.y <- append(green.y, rep(j - 0.5, g))
            blue.x <- append(blue.x, rep(i - 0.5, b))
            blue.y <- append(blue.y, rep(j - 0.5, b))
        }
    }

    print(2)

    estimate <- function(x, y){
        return(kde2d(x, y, c(bandwidth.nrd(x), bandwidth.nrd(y)), c(width, height)))
    }

    red_m <- estimate(red.x, red.y)
    green_m <- estimate(green.x, green.y)
    blue_m <- estimate(blue.x, blue.y)

    arrange <- function(x){
        if(x < 0){
            return(0)
        }else if(x > 255){
            return(255)
        }else{
            return(round(x))
        }
    }

    out_ppm <- file(commandArgs(trailingOnlly=TRUE)[2], "w")
    writeLines("P3", out_ppm, sep="\n")
    writeLines(c(width, height), out_ppm, sep="\n")
    writeLines(tmp, out_ppm, sep="\n")

    for(i in 1:height){
        for(j in 1:width){
            writeLines(c(arrange(red_m["z"][i, j]), arrange(green_m["z"][i, j]), arrange(blue_m["z"][i, j])), out_ppm, sep="\n")
        }
    }
}

main()
