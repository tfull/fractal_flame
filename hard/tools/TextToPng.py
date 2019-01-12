import sys
from PIL import Image

def main(filename):
	assert input() == "PNG Text", "no PNG Text header"

	width, height = [int(x) for x in input().split()]
	image = Image.new("RGBA", (width, height))

	for y in range(height):
		for x in range(width):
			r, g, b, a = [int(x) for x in input().split()]
			image.putpixel((x, y), (r, g, b, a))

	image.save(filename)

if __name__ == '__main__':
	main(sys.argv[1])
