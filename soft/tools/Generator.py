import random

REPEAT_COUNT = 1000000
SIZE = 360
DENSITY = 2

def get_variations():
    count = random.randint(2, 12)
    variations = [i for i in range(49)]
    random.shuffle(variations)
    return variations[:count]

def get_colors():
    count = random.randint(3, 100)
    rand = random.random()
    return [[random.random(), random.random(), random.random()] for i in range(count)]

def main():
    print("repeat", REPEAT_COUNT)
    print("size", SIZE)
    print("density", DENSITY)
    print("background", 0, 0, 0)
    print("variations", *get_variations())
    for color in get_colors():
        print("color", *color)

if __name__ == '__main__':
    main()
