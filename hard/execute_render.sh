if [ $# -eq 3 ]; then
    ./bin/render < $1 > $2
    convert $2 $3
    open $3
else
    echo "wrong number of arguments"
fi
