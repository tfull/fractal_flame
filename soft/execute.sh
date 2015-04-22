if [ $# -ge 1 ]
then
    mkdir -p log
    mkdir -p image
    tmp=${1##*/}
    output=image/${tmp%.*}.ppm
    image=image/${tmp%.*}.png
    log=log/${tmp%.*}.log
    scala -cp .:bin fractal.Main -log $log < $1 > $output
    convert $output $image
    open $image
else
    echo "few arguments"
fi
