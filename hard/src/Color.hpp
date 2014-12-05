#ifndef __COLOR_HPP__
#define __COLOR_HPP__

class Color{
public:
    double r, g, b;
    Color(double r = 0, double g = 0, double b = 0);
    Color(const Color &c);
    Color operator+(Color &c);
    Color operator-(Color &c);
    Color operator*(double c);
    Color operator/(double c);
    Color& operator=(const Color &c);
};

#endif
