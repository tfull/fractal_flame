for i in $(seq 0 48)
do
    f=`printf "%02d" $i`
    ./bin/grid $i < grid_input.txt > image/grid$f.ppm
    convert image/grid$f.ppm image/grid$f.png
done
