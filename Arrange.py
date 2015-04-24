# coding: utf-8

import sys

BACKGROUND = (0, 0, 0)
REQUIRED_DENSITY = 3

def getLine(f):
    while True:
        line = f.readline()
        if line[0] != "#":
            return line

def main(file_i, file_o):
    with open(file_i, "r") as fi, open(file_o, "w") as fo:
        fo.write(getLine(fi))
        line = getLine(fi)
        fo.write(line)
        xs = [int(x) for x in line.split()]
        width = xs[0]
        height = xs[1]
        fo.write(getLine(fi))

        matrix = [[None for j in range(width)] for i in range(height)]
        flag = [[False for j in range(width)] for i in range(height)]

        for i in range(height):
            for j in range(width):
                xs = [int(x) for x in getLine(fi).split()]
                matrix[i][j] = (xs[0], xs[1], xs[2])

        for i in range(height):
            for j in range(width):
                d = 0
                for di in range(max(i - 1, 0), min(i + 2, height)):
                    for dj in range(max(j - 1, 0), min(j + 2, width)):
                        if di == i and dj == j:
                            continue
                        if matrix[di][dj] != BACKGROUND:
                            d += 1
                if d >= REQUIRED_DENSITY:
                    flag[i][j] = True

        for i in range(height):
            for j in range(width):
                if flag[i][j]:
                    m = matrix[i][j]
                    fo.write("{0} {1} {2}\n".format(m[0], m[1], m[2]))
                else:
                    b = BACKGROUND
                    fo.write("{0} {1} {2}\n".format(b[0], b[1], b[2]))

if __name__ == '__main__':
    args = sys.argv
    main(args[1], args[2])
