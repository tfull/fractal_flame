set -e

count=2

mkdir -p log
mkdir -p image

for i in `seq 1 ${count}`
do
    name=`date "+%Y%m%d%H%M%S"`
    ppm=image/${name}.ppm
    png=image/${name}.png
    log=log/${name}.log
    python tools/Generator.py | scala -J-Xmx4G -cp .:bin fractal.Main -log $log > $ppm
    convert $ppm $png
done
