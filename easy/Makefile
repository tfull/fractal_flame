fname = Color Function Image Point Render Variation Main

bin/fractal/Main.class: $(foreach x,$(fname),src/fractal/$(x).scala)
	scalac -d bin/ $^

clean:
	rm -r bin/fractal
