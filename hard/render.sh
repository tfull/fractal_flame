mode=${mode:-"ppm"}

if [ $mode = "ppm" ]; then
	if [ $# -eq 3 ]; then
    	./bin/render --format ppm < $1 > $2
	    convert $2 $3
	    open $3
	else
	    echo "Error: wrong number of arguments"
	    exit 1
	fi
elif [ $mode = "png" ]; then
	if [ $# -eq 2 ]; then
		./bin/render --format tpng < $1 | python tools/TextToPng.py $2
		open $2
	else
		echo "Error: wrong number of arguments"
		exit 1
	fi
else
	echo "no such mode"
	exit 1
fi
