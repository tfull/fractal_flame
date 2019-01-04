set -e

count=10

mkdir -p png ppm txt

for i in `seq 1 ${count}`
do
    name=`date "+%Y%m%d%H%M%S"`
    ppm=ppm/${name}.ppm
    png=png/${name}.png
    log=txt/${name}.txt
    python tools/Generator.py | scala -J-Xmx4G -cp .:bin fractal.Main -log $log > $ppm
    convert $ppm $png
    # python tools/Database.py save --png $png --txt $log
done
