set -e
db_user=${user:-user}
db_password=${password:-password}

dbflag=true
count=100

mkdir -p png ppm txt

for i in `seq 1 ${count}`
do
    name=`date "+%Y%m%d%H%M%S"`
    ppm=ppm/${name}.ppm
    png=png/${name}.png
    log=txt/${name}.txt
    python tools/Generator.py | scala -J-Xmx4G -cp .:bin fractal.Main -log $log > $ppm
    convert $ppm $png
    if [ $dbflag ]
    then
        python tools/Database.py save --user $db_user --password $db_password --png $png --txt $log
        rm $ppm $png $log
    fi
done
