#ifndef __POINT_HPP__
#define __POINT_HPP__

class Point{
public:
    double x, y;
    Point(double x = 0, double y = 0);
    Point(const Point &p);
    Point operator+(Point p);
    Point operator-(Point p);
    Point operator*(double k);
    Point operator/(double k);
    Point& operator=(const Point &p);
    double theta();
    double phi();
    double r();
    double r2();
};

#endif
