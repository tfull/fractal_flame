fname = Color Function Image Point Render Variation

all: bin/fractal/Main.class bin/fractal/Grid.class

bin/fractal/Main.class: $(foreach x,$(fname),src/fractal/$(x).scala) src/fractal/Main.scala
	mkdir -p bin
	scalac -d bin/ $^

bin/fractal/Grid.class: $(foreach x,$(fname),src/fractal/$(x).scala) src/fractal/Grid.scala
	mkdir -p bin
	scalac -d bin/ $^

clean:
	rm -rf bin
