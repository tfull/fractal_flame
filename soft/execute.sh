if [ $# -ge 1 ]
then
    mkdir -p png ppm txt
    tmp=${1##*/}
    output=ppm/${tmp%.*}.ppm
    image=png/${tmp%.*}.png
    log=txt/${tmp%.*}.txt
    scala -J-Xmx4G -cp .:bin fractal.Main -log $log < $1 > $output
    convert $output $image
    open $image
else
    echo "few arguments"
fi
