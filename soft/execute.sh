count=${count:-1}

for file in `ls input/*.txt`
do
    for i in `seq 1 ${count}`
    do
        mkdir -p png ppm txt
        suffix=`TZ=Japan date "+%Y%m%d%H%M%S"`
        tmp=${file##*/}
        ppm=ppm/${tmp%.*}.${suffix}.ppm
        png=png/${tmp%.*}.${suffix}.png
        log=txt/${tmp%.*}.${suffix}.txt
        scala -J-Xmx4G -cp .:bin fractal.Main -log $log < $file > $ppm
        convert $ppm $png
        if [ $db_valid = "true" ]
        then
            $python_command tools/Database.py save --host $db_host --user $db_user --password $db_password --png $png --txt $log
            rm $ppm $png $log
        fi
    done
done
