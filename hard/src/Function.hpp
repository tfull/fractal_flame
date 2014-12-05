#ifndef __FUNCTION_HPP__
#define __FUNCTION_HPP__

#include "Point.hpp"
#include "Variation.hpp"
#include <vector>
#include <map>

class Function{
    double a, b, c, d, e, f;
public:
    Function(double,double,double,double,double,double);
    Function& operator=(const Function &f);
    Point apply(std::vector<std::pair<Variation,double> > &vws, Point &p);
};

#endif
