#include "Variation.hpp"

#include <cmath>
using namespace std;

const double pi = M_PI;
double omega13 = 0.0;
double c_a = 0.0;
double c_b = -0.1;
double c_c = -0.42;
double c_d = 0.0;
double c_e = 0.8;
double c_f = 0.5;

void setOmega13(double x){
    omega13 = x;
}

Point v0(Point p){
    return p;
}

Point v1(Point p){
    return Point(sin(p.x), sin(p.y));
}

Point v2(Point p){
    return p / p.r2();
}

Point v3(Point p){
    double x = p.x;
    double y = p.y;
    double s2 = sin(p.r2());
    double c2 = cos(p.r2());
    return Point(x*s2-y*c2, x*c2+y*s2);
}

Point v4(Point p){
    double x = p.x;
    double y = p.y;
    return Point((x-y)*(x+y), 2*x*y) / p.r();
}

Point v5(Point p){
    return Point(p.theta() / pi, p.r() - 1);
}

Point v6(Point p){
    double t = p.theta();
    double r = p.r();
    return Point(sin(t+r), cos(t-r)) * r;
}

Point v7(Point p){
    double r = p.r();
    double t = p.theta();
    return Point(sin(t*r), -cos(t*r)) * r;
}

Point v8(Point p){
    double r = p.r();
    return Point(sin(r*pi), cos(r*pi)) * (p.theta() / pi);
}

Point v9(Point p){
    double r = p.r();
    double t = p.theta();
    return Point(cos(t)+sin(r), sin(t)-cos(r)) / r;
}

Point v10(Point p){
    double r = p.r();
    double t = p.theta();
    return Point(sin(t)/r, r*cos(t));
}

Point v11(Point p){
    double r = p.r();
    double t = p.theta();
    return Point(sin(t)*cos(r), cos(t)*sin(r));
}

Point v12(Point p){
    double r = p.r();
    double t = p.theta();
    double p03 = pow(sin(t+r), 3.0);
    double p13 = pow(cos(t-r), 3.0);
    return Point(p03+p13, p03-p13) * r;
}

Point v13(Point p){
    double rootr = sqrt(p.r());
    double t = p.theta();
    return Point(cos(t/2+omega13), sin(t/2+omega13)) * rootr;
}

Point v14(Point p){
    double x;
    double y;
    if(p.x >= 0){
        x = p.x;        
    }else{
        x = 2 * p.x;
    }
    if(p.y >= 0){
        y = p.y;
    }else{
        y = p.y / 2;
    }
    return Point(x, y);
}

Point v15(Point p){
    double x = p.x;
    double y = p.y;
    return Point(x+c_b*sin(y/(c_c*c_c)), y+c_e*sin(x/(c_f*c_f)));
}

Point v16(Point p){
    return Point(p.y, p.x) * (2 / (p.r() + 1));
}

Point v17(Point p){
    double x = p.x;
    double y = p.y;
    return Point(x+c_c*sin(tan(3*y)), y+c_f*sin(tan(3*x)));
}

Point v18(Point p){
    double y = p.y;
    return Point(cos(pi*y), sin(pi*y)) * exp(p.x - 1);
}

Point v19(Point p){
    double t = p.theta();
    return Point(cos(t), sin(t)) * pow(p.r(), sin(t));
}

Point v20(Point p){
    double x = p.x;
    double y = p.y;
    return Point(cos(pi*x)*cosh(y), - sin(pi*x)*sinh(y));
}

Point v21(Point p){
    double r = p.r();
    double t = p.theta();
    static double c2 = c_c * c_c;
    return Point(cos(t), sin(t)) * (fmod(r+c2,2*c2)-c2+r*(1-c2));
}

Variation variations[] = {v0,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16,v17,v18,v19,v20,v21};

/*
void initializeV(){
    int size = sizeof(vs) / sizeof(Variation);
    for(int i = 0; i < size; i++){
        variations.push_back(vs[i]);
    }
}
*/
