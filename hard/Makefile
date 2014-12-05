cppc = g++

axes = bin/Point.o bin/Variation.o
others = bin/Color.o bin/Image.o bin/Function.o
options = -Wall -O2

all: bin/grid bin/render

bin/grid: $(axes) bin/grid.o
	$(cppc) -o $@ $^

bin/render: $(axes) $(others) bin/render.o
	$(cppc) -o $@ $^

bin/%.o: src/%.cpp
	$(cppc) $(options) -c -o $@ $<

clean:
	rm bin/*
