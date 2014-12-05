axes="bin/Point.o bin/Variation.o"
others="bin/Color.o bin/Image.o bin/Function.o"
a=0
o=0
rm bin/*
for x in ${axes}
do
    y=${x%.*}
    g++ -c -O2 -o $x src/${y##*/}.cpp
    if [ $? -ne 0 ]; then
        a=$(($a + 1))
    fi
done
for x in ${others}
do
    y=${x%.*}
    g++ -c -O2 -o $x src/${y##*/}.cpp
    if [ $? -ne 0 ]; then
        o=$(($o + 1))
    fi
done
if [ $a -eq 0 ]; then
    g++ -o bin/grid -O2 ${axes} src/grid.cpp
fi
if [ $(($o + $a)) -eq 0 ]; then
    g++ -o bin/render -O2 ${axes} ${others} src/render.cpp
fi
