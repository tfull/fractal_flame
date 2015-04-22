fname = Color Function Image Point Render Variation Main

bin/fractal/Main.class: $(foreach x,$(fname),src/fractal/$(x).scala)
	mkdir -p bin
	scalac -d bin/ $^

clean:
	rm -rf bin
