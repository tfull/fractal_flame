#include <iostream>
#include <cstdlib>
#include <string>
#include <sstream>
#include "Variation.hpp"

extern Variation variations[];

int main(int argc, char *argv[]){
    if(argc < 2){
        std::cerr << "few arguments" << std::endl;
    }
    
    const int n = std::atoi(argv[1]);
    const double xa[] = { -1.0, 1.0 };
    const double ya[] = { 1.0, -1.0 };
    const int size = 480;
    const int grid = 48;
    const int d = 4;

    initializeParameters();

    std::string line;

    while(std::getline(std::cin, line)){
        std::stringstream ss(line);
        std::string s, t;

        ss >> s >> t;
        setParameter(s, t);
    }

    Variation v = variations[n];

    bool **image;
    image = new bool*[size];
    for(int i = 0; i < size; i++){
        image[i] = new bool[size];
        for(int j = 0; j < size; j++){
            image[i][j] = true;
        }
    }

    for(int i = 0; i <= grid; i++){
        for(int j = 0; j < (d * size); j++){
            double x = (double)j / (d * size) * (xa[1] - xa[0]) + xa[0];
            double y = (double)i / grid * (ya[1] - ya[0]) + ya[0];
            Point p = v(Point(x, y));
            int ix = (p.x - xa[0]) / (xa[1] - xa[0]) * size;
            int iy = (p.y - ya[0]) / (ya[1] - ya[0]) * size;
            if(ix >= 0 && ix < size && iy >= 0 && iy < size){
                image[iy][ix] = false;
            }
        }
    }

    for(int j = 0; j <= grid; j++){
        for(int i = 0; i < (d * size); i++){
            double x = (double)j / grid * (xa[1] - xa[0]) + xa[0];
            double y = (double)i / (d * size) * (ya[1] - ya[0]) + ya[0];
            Point p = v(Point(x, y));
            int ix = (p.x - xa[0]) / (xa[1] - xa[0]) * size;
            int iy = (p.y - ya[0]) / (ya[1] - ya[0]) * size;
            if(ix >= 0 && ix < size && iy >= 0 && iy < size){
                image[iy][ix] = false;
            }
        }
    }

    std::cout << "P3" << '\n' << size << ' ' << size << '\n' << 255 << std::endl;

    for(int i = 0; i < size; i++){
        for(int j = 0; j < size; j++){
            if(image[i][j]){
                std::cout << "255 255 255" << std::endl;
            }else{
                std::cout << "0 0 0" << std::endl;
            }
        }
    }

    for(int i = 0; i < size; i++){
        delete image[i];
    }
    delete image;

    return 0;
}
