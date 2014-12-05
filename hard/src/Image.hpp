#ifndef __IMAGE_HPP__
#define __IMAGE_HPP__

#include <map>
#include "Color.hpp"
#include "Point.hpp"

class Image{
    Color **image;
    const int width, height, density;
    const double x0, x1, y0, y1, xmin, xmax, ymin, ymax;
    const int d_width, d_height;
    const Color background;
public:
    Image(int,int,int,std::pair<double,double>,std::pair<double,double>,Color);
    ~Image();
    void blend(Point &p, Color &c);
    void printP3();
};

#endif
