#include "Variation.hpp"

#include <cmath>
#include <map>
#include <sstream>
#include <iostream>
#include <random>
using namespace std;

map<string, double> parameters;

const double pi = M_PI;

double Psi(){
    static random_device random_d;
    static mt19937 mt(random_d());
    static uniform_real_distribution<double> psi(0.0, 1.0);

    return psi(mt);
}

double Lambda(){
    static random_device random_d;
    static mt19937 mt(random_d());
    static uniform_int_distribution<int> ui(0, 1);
    static int a[] = { -1, 1 };

    return a[ui(mt)];
}

void initializeParameters(){
    parameters["a"] = 0.0;
    parameters["b"] = -0.1;
    parameters["c"] = -0.42;
    parameters["d"] = 0.0;
    parameters["e"] = 0.8;
    parameters["f"] = 0.5;
    parameters["Omega"] = 0.0;
    parameters["blob.high"] = 1;
    parameters["blob.low"] = 0.5;
    parameters["blob.waves"] = 5;
    parameters["pdj.a"] = 0.7;
    parameters["pdj.b"] = 0.3;
    parameters["pdj.c"] = 0.6;
    parameters["pdj.d"] = 0.1;
    parameters["fan2.x"] = 0.8;
    parameters["fan2.y"] = 1.0;
    parameters["rings2.val"] = 0.5;
    parameters["perspective.angle"] = 0.5;
    parameters["perspective.dist"] = 2;
    parameters["juliaN.power"] = 2;
    parameters["juliaN.dist"] = 2;
    parameters["juliaScope.power"] = 2;
    parameters["juliaScope.dist"] = 2;
    parameters["v36"] = 1.5;
    parameters["radialBlur.angle"] = 1.2;
    parameters["pie.slices"] = 5;
    parameters["pie.rotation"] = 0.2;
    parameters["pie.thickness"] = 0.2;
    parameters["ngon.power"] = 2;
    parameters["ngon.sides"] = 0.3;
    parameters["ngon.corners"] = 0.3;
    parameters["ngon.circle"] = 0.4;
    parameters["curl.c1"] = 0.4;
    parameters["curl.c2"] = 0.6;
    parameters["rectangles.x"] = 0.8;
    parameters["rectangles.y"] = 0.4;
    parameters["v41"] = 1.0;
    parameters["v44"] = 3.0;
    parameters["v45"] = 2.0;
    parameters["v46"] = 2.0;
    parameters["v47"] = 2.0;
}

void setParameter(string s, string fs){
    stringstream ss(fs);

    if(s == "Omega"){
        string t;
        ss >> t;
        if(t == "pi"){
            parameters["Omega"] = pi;
        }else{
            parameters["Omega"] = 0.0;
        }
    }else if(parameters.count(s)){
        ss >> parameters[s];
    }else{
        cerr << "no such variable: " << s << endl;
    }

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
    double o = parameters["Omega"];
    return Point(cos(t/2+o), sin(t/2+o)) * rootr;
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
    double b = parameters["b"];
    double c = parameters["c"];
    double e = parameters["e"];
    double f = parameters["f"];
    return Point(x+b*sin(y/(c*c)), y+e*sin(x/(f*f)));
}

Point v16(Point p){
    return Point(p.y, p.x) * (2 / (p.r() + 1));
}

Point v17(Point p){
    double x = p.x;
    double y = p.y;
    double c = parameters["c"];
    double f = parameters["f"];
    return Point(x+c*sin(tan(3*y)), y+f*sin(tan(3*x)));
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
    double c = parameters["c"];
    double c2 = c * c;
    return Point(cos(t), sin(t)) * (fmod(r+c2,2*c2)-c2+r*(1-c2));
}

Point v22(Point p){
    double r = p.r();
    double theta = p.theta();
    double c = parameters["c"];
    double f = parameters["f"];
    double t = pi * c * c;
    double td2 = t / 2.0;
    if(fmod(theta + f, t) > td2){
        return Point(cos(theta - td2), sin(theta - td2)) * r;
    }else{
        return Point(cos(theta + td2), sin(theta + td2)) * r;
    }
}

Point v23(Point p){
    double p1 = parameters["blob.high"];
    double p2 = parameters["blob.low"];
    double p3 = parameters["blob.waves"];
    double r = p.r();
    double theta = p.theta();
    return Point(cos(theta), sin(theta)) * (r * (p2 + (p1 - p2) / 2.0 * (sin(p3 * theta) + 1)));
}

Point v24(Point p){
    double p1 = parameters["pdj.a"];
    double p2 = parameters["pdj.b"];
    double p3 = parameters["pdj.c"];
    double p4 = parameters["pdj.d"];
    double x = p.x;
    double y = p.y;
    return Point(sin(p1 * y) - cos(p2 * x), sin(p3 * x) - cos(p4 * y));
}

Point v25(Point p){
    double p1 = pi * parameters["fan2.x"] * parameters["fan2.x"];
    double p2 = parameters["fan2.y"];
    double r = p.r();
    double theta = p.theta();
    double t = theta + p2 - p1 * trunc(2.0 * theta * p2 / p1);
    if(t > p1 / 2.0){
        return Point(sin(theta - p1 / 2.0), cos(theta - p1 / 2.0)) * r;
    }else{
        return Point(sin(theta + p1 / 2.0), cos(theta + p1 / 2.0)) * r;
    }
}

Point v26(Point p){
    double q = parameters["rings2.val"] * parameters["rings2.val"];
    double r = p.r();
    double theta = p.theta();
    double t = r - 2.0 * q * trunc((r + q) / (2.0 * q)) + r * (1.0 - q);
    return Point(sin(theta), cos(theta)) * t;
}

Point v27(Point p){
    return p * (2.0 / (p.r() + 1.0));
}

Point v28(Point p){
    return p * (4.0 / (p.r2() + 4.0));
}

Point v29(Point p){
    return Point(sin(p.x), p.y);
}

Point v30(Point p){
    double p1 = parameters["perspective.angle"];
    double p2 = parameters["perspective.dist"];
    return Point(p.x, p.y * cos(p1)) * (p2 / (p2 - p.y * sin(p1)));
}

Point v31(Point p){
    double psi1 = Psi();
    double psi2 = Psi();
    return Point(p.x * cos(2.0 * pi * psi2), p.y * sin(2.0 * pi * psi2)) * psi1;
}

Point v32(Point p){
    double p1 = parameters["juliaN.power"];
    double p2 = parameters["juliaN.dist"];
    double p3 = trunc(abs(p1) * Psi());
    double t = (p.phi() + 2.0 * pi * p3) / p1;
    return Point(cos(t), sin(t)) * pow(p.r(), p2 / p1);
}

Point v33(Point p){
    double p1 = parameters["juliaScope.power"];
    double p2 = parameters["juliaScope.dist"];
    double p3 = trunc(abs(p1) * Psi());
    double t = (Lambda() * p.phi() + 2.0 * pi * p3) / p1;
    double r = p.r();
    return Point(cos(t), sin(t)) * pow(r, p2 / p1);
}

Point v34(Point p){
    double psi1 = Psi();
    double psi2 = Psi();
    double t = 2.0 * pi * psi2;
    return Point(cos(t), sin(t)) * psi1;
}

Point v35(Point p){
    double s = -2.0;
    for(int i = 0; i < 4; i++){
        s += Psi();
    }
    double t = 2.0 * pi * Psi();
    return Point(cos(t), sin(t)) * s;
}

Point v36(Point p){
    double s = -2.0;
    for(int i = 0; i < 4; i++){
        s += Psi();
    }
    double v36 = parameters["v36"];
    double p1 = parameters["radialBlur.angle"] * pi / 2.0;
    double t1 = v36 * s;
    double t2 = p.phi() + t1 * sin(p1);
    double t3 = t1 * cos(p1) - 1.0;
    double r = p.r();
    return Point(r * cos(t2) + t3 * p.x, r * sin(t2) + t3 * p.y) / v36;
}

Point v37(Point p){
    double p1 = parameters["pie.slices"];
    double p2 = parameters["pie.rotation"];
    double p3 = parameters["pie.thickness"];
    double t1 = trunc(Psi() * p1 + 0.5);
    double t2 = p2 + (2.0 * pi) / p1 * (t1 + Psi() * p3);
    return Point(cos(t2), sin(t2)) * Psi();
}

Point v38(Point p){
    double r = p.r();
    double p1 = parameters["ngon.power"];
    double p2 = 2.0 * pi / parameters["ngon.sides"];
    double p3 = parameters["ngon.corners"];
    double p4 = parameters["ngon.circle"];
    double t3 = p.phi() - p2 * round(p.phi() / p2);
    double t4;
    if(t3 > p2 / 2.0){
        t4 = t3;
    }else{
        t4 = t3 - p2;
    }
    double k = (p3 * (1.0 / cos(t4)) + p4) / pow(r, p1);
    return p * k;
}

Point v39(Point p){
    double x = p.x;
    double y = p.y;
    double p1 = parameters["curl.c1"];
    double p2 = parameters["curl.c2"];
    double t1 = 1.0 + p1 * x + p2 * (x * x - y * y);
    double t2 = p1 * y + 2.0 * p2 * x * y;
    return Point(x * t1 + y * t2, y * t1 - x * t2) * (1.0 / (t1 * t1 + t2 * t2));
}

Point v40(Point p){
    double p1 = parameters["rectangles.x"];
    double p2 = parameters["rectangles.y"];
    double x = p.x;
    double y = p.y;
    return Point((2.0 * round(x / p1) + 1) * p1 - x, (2.0 * round(y / p2) + 1) * p2 - y);
}

Point v41(Point p){
    double k = Psi() * pi * parameters["v41"];
    return Point(sin(k), sin(k) * tan(k));
}

Point v42(Point p){
    double y = p.y;
    return Point(sin(p.x) / cos(y), tan(y));
}

Point v43(Point p){
    return Point(Psi() - 0.5, Psi() - 0.5);
}

Point v44(Point p){
    double v44 = parameters["v44"];
    return Point(cos(p.x), sin(p.y)) * (v44 * tan(Psi() * pi * v44) / p.r2());
}

Point v45(Point p){
    double k = Psi() * p.r() * parameters["v45"];
    return Point(cos(k) + sin(k), cos(k) - sin(k)) * p.x;
}

Point v46(Point p){
    double v = parameters["v46"];
    return Point(p.x, 1.0 / (v * cos(v * p.r())));
}

Point v47(Point p){
    double k = Psi() * p.r() * parameters["v47"];
    double t = log10(pow(sin(k), 2.0)) + cos(k);
    return Point(t, t - pi * sin(k)) * p.x;
}

Point v48(Point p){
    double s = p.x * p.x - p.y * p.y;
    return p * sqrt(1.0 / (s * s));
}

Variation variations[] = {v0,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16,v17,v18,v19,v20,v21,v22,v23,v24,v25,v26,v27,v28,v29,v30,v31,v32,v33,v34,v35,v36,v37,v38,v39,v40,v41,v42,v43,v44,v45,v46,v47,v48};
