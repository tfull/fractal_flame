#include "Point.hpp"
#include <cmath>

Point::Point(double x, double y) : x(x), y(y){
}

Point::Point(const Point &p) : x(p.x), y(p.y){
}

Point Point::operator+(Point p){
    return Point(x + p.x, y + p.y);
}

Point Point::operator-(Point p){
    return Point(x - p.x, y - p.y);
}

Point Point::operator*(double k){
    return Point(x * k, y * k);
}

Point Point::operator/(double k){
    return Point(x / k, y / k);
}

Point& Point::operator=(const Point &p){
    this->x = p.x;
    this->y = p.y;
    return *this;
}

double Point::theta(){
    return std::atan2(x, y);
}

double Point::phi(){
    return std::atan2(y, x);
}

double Point::r(){
    return std::sqrt(this->r2());
}

double Point::r2(){
    return (x * x + y * y);
}
