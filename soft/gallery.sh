set -e
db_host=${db_host:-localhost}
db_user=${db_user:-user}
db_password=${db_password:-password}
count=${count:-100}
python_command=${python_command:-python3}

dbflag=true

mkdir -p png ppm txt

for i in `seq 1 ${count}`
do
    name=`date "+%Y%m%d%H%M%S"`
    ppm=ppm/${name}.ppm
    png=png/${name}.png
    log=txt/${name}.txt
    $python_command tools/Generator.py | scala -J-Xmx4G -cp .:bin fractal.Main -log $log > $ppm
    convert $ppm $png
    if [ $dbflag ]
    then
        $python_command tools/Database.py save --host $db_host --user $db_user --password $db_password --png $png --txt $log
        rm $ppm $png $log
    fi
done
