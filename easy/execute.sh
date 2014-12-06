if [ $# -ge 1 ]
then
    tmp=${1##*/}
    output=image/${tmp%.*}.ppm
    image=image/${tmp%.*}.png
    scala -cp .:bin fractal.Main < $1 > $output
    convert $output $image
    open $image
else
    echo "few arguments"
fi
