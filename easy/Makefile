fname = Color Function Image Point Render Variation Main

bin/fractal/Main.class: $(foreach x,$(fname),src/frame/$(x).scala)
	cd src
	scalac -d ../bin/ $^

clean:
	rm -r bin/fractal
