#include "Image.hpp"
#include <iostream>
#include <cstdio>
#include <cstdlib>
#include <cmath>

Image::Image(int w, int h, int d, std::pair<double, double> x, std::pair<double, double> y, Color c) : width(w), height(h), density(d), x0(x.first), x1(x.second), y0(y.first), y1(y.second), xmin(std::min(x0, x1)), xmax(std::max(x0, x1)), ymin(std::min(y0, y1)), ymax(std::max(y0, y1)), d_width(w*d), d_height(h*d), background(c){

    image = new Color*[d_height];

    for(int i = 0; i < d_height; i++){
        image[i] = new Color[d_width];

        for(int j = 0; j < d_width; j++){
            image[i][j] = c;
        }
    }
}

Image::~Image(){
    for(int i = 0; i < d_height; i++){
        delete image[i];
    }
    delete image;
}

void Image::blend(Point &p, Color &c){
    double x = p.x;
    double y = p.y;
    if(x < xmin || x > xmax || y < ymin || y > ymax){ return; }

    int ix = std::max(0, std::min(d_width - 1, int((x - x0) / (x1 - x0) * d_width)));
    int iy = std::max(0, std::min(d_height - 1, int((y - y0) / (y1 - y0) * d_height)));

    image[iy][ix] = (c + image[iy][ix]) / 2;
}

int gammaRevise(double x){
    if(x < 0){
        x = 0;
    }else if(x > 1){
        x = 1;
    }
    return int(std::pow(x, 1.0 / 2.2) * 255.0 + 0.5);
}

void Image::printP3(){
    std::printf("P3\n#\n%d %d\n255\n", width, height);

    for(int i = 0; i < height; i++){
        for(int j = 0; j < width; j++){
            Color c = Color();

            for(int di = 0; di < density; di++){
                for(int dj = 0; dj < density; dj++){
                    c = c + image[i * density + di][j * density + dj];
                }
            }

            c = c / (density * density);
            std::printf("%d %d %d\n", gammaRevise(c.r), gammaRevise(c.g), gammaRevise(c.b));
        }
    }
}
