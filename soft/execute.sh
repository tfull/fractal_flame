count=${count:-1}

for file in `ls input/*.txt`
do
    for i in `seq 1 ${count}`
    do
        mkdir -p png ppm txt
        suffix=`TZ=Japan date "+%Y%m%d%H%M%S"`
        tmp=${file##*/}
        output=ppm/${tmp%.*}.${suffix}.ppm
        image=png/${tmp%.*}.${suffix}.png
        log=txt/${tmp%.*}.${suffix}.txt
        scala -J-Xmx4G -cp .:bin fractal.Main -log $log < $file > $output
        convert $output $image
    done
done
