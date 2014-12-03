if [ $# -ge 1 ]
then
    input=${1##*/}
    output=image/${input%.*}.ppm
    image=image/${input%.*}.png
    scala -cp .:bin fractal.Main < $input > $output
    convert $output $image
    open $image
else
    echo "few arguments"
fi
