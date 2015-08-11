#ifndef __VARIATION_HPP__
#define __VARIATION_HPP__

#include "Point.hpp"
#include <string>

typedef Point (*Variation)(Point);
void initializeParameters();
void setParameter(std::string, std::string);

#endif
