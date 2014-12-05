#include "Color.hpp"

Color::Color(double r, double g, double b) : r(r), g(g), b(b){
}

Color::Color(const Color &c) : r(c.r), g(c.g), b(c.b){
}

Color Color::operator+(Color &c){
    return Color(r + c.r, g + c.g, b + c.b);
}

Color Color::operator-(Color &c){
    return Color(r - c.r, g - c.g, b - c.b);
}

Color Color::operator*(double k){
    return Color(r * k, g * k, b * k);
}

Color Color::operator/(double k){
    return Color(r / k, g / k, b / k);
}

Color& Color::operator=(const Color &c){
    this->r = c.r;
    this->g = c.g;
    this->b = c.b;
    return *this;
}
