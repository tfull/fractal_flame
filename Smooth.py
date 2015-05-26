# coding: utf-8

import sys
import math

def getLine(f):
    while True:
        line = f.readline()
        if line[0] != "#":
            return line

def kernel(p):
    dd = p[0] ** 2 + p[1] ** 2
    d = math.sqrt(dd)
    if d < 1:
        return (2 / math.pi) * (1 - dd)
    else:
        return 0

def gamma(x):
    if x < 0:
        return 0
    elif x > 255:
        return 255
    else:
        return round(x)

def main(file_i, file_o):
    n = 5
    h = 0.7

    with open(file_i, "r") as fi, open(file_o, "w") as fo:
        line = getLine(fi)
        fo.write(line)
        line = getLine(fi)
        fo.write(line)
        (width, height) = [int(x) for x in line.split()]
        line = getLine(fi)
        fo.write(line)

        matrix = [[None for j in range(width)] for i in range(height)]

        for i in range(height):
            for j in range(width):
                line = getLine(fi)
                xs = line.split()
                r = int(xs[0])
                g = int(xs[1])
                b = int(xs[2])
                matrix[i][j] = (r, g, b)

        for i in range(height):
            for j in range(width):
                pi = (i + 0.5) / height
                pj = (j + 0.5) / width

                tmp = (0, 0, 0)

                ri = range(max(0, i - n), min(height, i + n + 1))
                rj = range(max(0, j - n), min(width, j + n + 1))

                for ni in ri:
                    for nj in rj:
                        npi = (ni + 0.5) / height
                        npj = (nj + 0.5) / width
                        k = kernel(((pj - npj) / h, (pi - npi) / h))
                        tmp = (tmp[0] + matrix[ni][nj][0] * k, tmp[1] + matrix[ni][nj][1] * k, tmp[2] + matrix[ni][nj][2] * k)

                fo.write(str(gamma(1 / (len(ri) * len(rj) * (h ** 2)) * tmp[0])) + " ")
                fo.write(str(gamma(1 / (len(ri) * len(rj) * (h ** 2)) * tmp[1])) + " ")
                fo.write(str(gamma(1 / (len(ri) * len(rj) * (h ** 2)) * tmp[2])) + "\n")

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
