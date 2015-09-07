#include "Point.hpp"
#include "Color.hpp"
#include "Image.hpp"
#include "Function.hpp"
#include "Variation.hpp"

#include <iostream>
#include <cstdlib>
#include <string>
#include <sstream>
#include <vector>
#include <map>
#include <ctime>

using namespace std;

extern Variation variations[];

struct FCP{
    Function f;
    Color c;
    pair<int, int> p;
};

int main(int argc, char *argv[]){
    string line;
    int line_n = 0;
    int width = 480;
    int height = 480;
    int density = 3;
    unsigned long repeat = 1000000UL;
    pair<double,double> xa(-1.0, 1.0);
    pair<double,double> ya(1.0, -1.0);
    vector<Variation> vs;
    vector<unsigned int> ws;
    int wsum = 0;
    vector<Function> fs;
    vector<unsigned int> ps;
    int psum = 0;
    vector<Color> cs;
    Color background;

    initializeParameters();

    vector<pair<Variation, double> >vws;

    while(getline(cin, line)){
        stringstream ss(line);
        string s;

        ++ line_n;

        ss >> s;

        if(s == "width"){
            ss >> width;
        }else if(s == "height"){
            ss >> height;
        }else if(s == "xaxis"){
            ss >> xa.first >> xa.second;
        }else if(s == "yaxis"){
            ss >> ya.first >> ya.second;
        }else if(s == "density"){
            ss >> density;
        }else if(s == "function"){
            int p;
            double r, g, b, a, c, d, e, f;
            ss >> p;
            ps.push_back(p);
            psum += p;
            ss >> r >> g >> b;
            cs.push_back(Color(r, g, b));
            ss >> a >> b >> c >> d >> e >> f;
            fs.push_back(Function(a, b, c, d, e, f));
        }else if(s == "variation"){
            int k, w;
            ss >> k >> w;
            vs.push_back(variations[k]);
            ws.push_back(w);
            wsum += w;
        }else if(s == "repeat"){
            ss >> repeat;
        }else if(s == "background"){
            double r, g, b;
            ss >> r >> g >> b;
            background = Color(r, g, b);
        }else if(s == "parameter"){
            string sk, tk;
            ss >> sk >> tk;
            setParameter(sk, tk);
        }else if(s == "#"){
        }else{
            cerr << line_n << ": unknown command" << endl;
            return 1;
        }
    }

    Image image(width,height,density,xa,ya,background);

    int n = ps.size();
    int pcount = 0;

    vector<FCP> fcps;

    for(int i = 0; i < n; i++){
        int p = pcount + ps[i];
        FCP fcp = { fs[i], cs[i], pair<int,int>(pcount, p) };
        fcps.push_back(fcp);
        pcount = p;
    }

    int k = vs.size();

    for(int i = 0; i < k; i++){
        vws.push_back(pair<Variation, double>(vs[i], (double)ws[i] / wsum));
    }

    srand(time(NULL));

    Point point(double(rand() % 101) / 100 , double(rand() % 101) / 100);

    for(unsigned long rep = 0UL; rep < repeat; rep++){
        int r = rand() % psum;
        for(int i = 0; i < n; i++){
            if(fcps[i].p.first <= r && r < fcps[i].p.second){
                point = fcps[i].f.apply(vws, point);
                if(rep > 20UL){
                    image.blend(point, fcps[i].c);
                }
                break;
            }
        }
    }

    image.printP3();

    return 0;
}