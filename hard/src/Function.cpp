#include "Function.hpp"

Function::Function(double a, double b, double c, double d, double e, double f) : a(a), b(b), c(c), d(d), e(e), f(f){
}

Function& Function::operator=(const Function &f){
    this->a = f.a;
    this->b = f.b;
    this->c = f.c;
    this->d = f.d;
    this->e = f.e;
    this->f = f.f;
    return *this;
}

Point Function::apply(std::vector<std::pair<Variation, double> > &vws, Point &p){
    Point point = Point();
    double x = p.x;
    double y = p.y;
    int k = vws.size();

    for(int i = 0; i < k; i++){
        Variation v = vws[i].first;
        double w = vws[i].second;
        point = point + v(Point(a*x + b*y + c, d*x + e*y + f)) * w;
    }

    return point;
}
