(function(){
    var canvas;
    var context;
    var width;
    var height;

    var funs = [];

    var debug;

    function showDebug(s){
        while(debug.firstChild){
            debug.removeChild(debug.firstChild);
        }
        debug.appendChild(document.createTextNode(s));
    }

    function getChildrenByTagName(parent, tag){
        var nodes = parent.childNodes;
        var a = [];
        for(var i in nodes){
            if(nodes[i].nodeType == 1 && nodes[i].nodeName.toLowerCase() == tag){
                a.push(nodes[i]);
            }
        }
        return a;
    }

    function takeNewID(){
        for(var n = 0; ; n++){
            var flag = false;
            for(var i = 0; i < funs.length; i++){
                if(funs[i] == n){
                    flag = true;
                    break;
                }
            }
            if(! flag){
                funs.push(n);
                return n;
            }
        }
    }

    function dropID(n){
        for(var i in funs){
            if(funs[i] == n){
                funs.splice(i, 1);
            }
        }
    }

    function readVariations(){
        var v = document.getElementById("variation");
        for(var i in variations){
            var div = document.createElement("div");
            div.id = "v" + i;
            var s = "\\(V_{" + i + "}(x,y) = " + variations[i][1] + "\\)";
            var eq = document.createElement("div");
            eq.class = "equation";
            eq.appendChild(document.createTextNode(s));
            div.appendChild(eq);
            var w = document.createElement("div");
            var span = document.createElement("span");
            span.appendChild(document.createTextNode("weight: "));
            var input = document.createElement("input");
            input.type = "text";
            input.size = 5;
            if(i == 0){
                input.value = 1;
            }else{
                input.value = 0;
            }
            input.class = "weight";
            (function(){
                var input_ = input;
                input.onchange = function(){
                    var n = parseInt(input_.value);
                    if(isNaN(n) || n < 0){
                        input_.value = "0";
                    }else{
                        input_.value = String(n);
                    }
                }
            })();
            w.appendChild(span);
            w.appendChild(input);
            div.appendChild(w);

            v.appendChild(div);
        }
    }

    function getFunctions(){
        var result = [];
        var divs = getChildrenByTagName(document.getElementById("function"), "div");

        var sum = 0;

        for(var div_i in divs){
            var ds = getChildrenByTagName(divs[div_i], "div");
            var coefficients = [];
            var d;
            var cs;

            d = ds[3];
            p = parseInt(d.getElementsByTagName("input")[0].value);

            if(p == 0){
                continue;
            }

            sum += p;

            d = ds[1];
            cs = d.getElementsByTagName("input");
            var fun = new Function(cs[0].value, cs[1].value, cs[2].value, cs[3].value, cs[4].value, cs[5].value);
            d = ds[2];
            cs = d.getElementsByTagName("input");
            var color = new Color(cs[0].value, cs[1].value, cs[2].value);

            result.push({
                fun: fun,
                color: color,
                probability: sum,
            });
        }

        return result;
    }

    function getVariations(){
        var divs = getChildrenByTagName(document.getElementById("variation"), "div");
        var sum = 0;
        var result = [];

        for(var div_i in divs){
            var ds = getChildrenByTagName(divs[div_i], "div");
            var d = ds[1];
            var w = parseInt(d.getElementsByTagName("input")[0].value);
            if(w == 0){
                continue;
            }
            sum += w;
            result.push({
                variation: variations[div_i][0],
                weight: w,
            });
        }

        for(var i in result){
            result[i].weight = result[i].weight / sum;
        }

        return result;
    }

    function draw(){
        context.fillRect(0, 0, canvas.width, canvas.height);

        var image = [];
        var repeat = Number(document.getElementById("repeat").value);
        var frequency = [];
        var point = new Point(Math.random(), Math.random());

        var fs = getFunctions();
        var vs = getVariations();

        var maxp = fs[fs.length - 1].probability;

        for(var i = 0; i < height; i++){
            image[i] = [];
            frequency[i] = [];
            for(var j = 0; j < width; j++){
                image[i][j] = new Color(0, 0, 0);
                frequency[i][j] = 0;
            }
        }

        for(var rep = 0; rep < repeat; rep++){
            var seed = Math.floor(Math.random() * maxp);
            var i;
            for(i = 0; i < fs.length; i++){
                if(seed < fs[i].probability){
                    break;
                }
            }

            point = fs[i].fun.apply(point, vs);

            var x = parseInt((point.x + 1) / 2 * width);
            var y = parseInt((1 - point.y) / 2 * height);

            if(rep < 20){
                continue;
            }

            if(x >= 0 && x < width && y >= 0 && y < height){
                frequency[y][x] += 1;
                image[y][x] = image[y][x].add(fs[i].color).scale(1 / 2);
            }
        }

        var f_max = 0;

        for(var i = 0; i < height; i++){
            for(var j = 0; j < width; j++){
                if(f_max < frequency[i][j]){
                    f_max = frequency[i][j];
                }
            }
        }

        for(var i = 0; i < height; i++){
            for(var j = 0; j < width; j++){
                if(frequency[i][j] > 0){
                    frequency[i][j] = Math.log(frequency[i][j]) / Math.log(f_max);
                    image[i][j] = image[i][j].scale(Math.pow(frequency[i][j], 1/2.2));
                    context.fillStyle = "rgb(" + gamma(image[i][j].r) + "," + gamma(image[i][j].g) + "," + gamma(image[i][j].b) + ")";
                    context.fillRect(j, i, 1, 1);
                }else{
                    context.fillStyle = "rgb(0,0,0)";
                    context.fillRect(j, i, 1, 1);
                }
            }
        }
    }

    function gamma(x){
        var y = parseInt(x * 255.0 + 0.5);
        if(y < 0){
            return 0;
        }else if(y > 255){
            return 255;
        }else{
            return y;
        }
    }

    window.onload = function(){
        debug = document.getElementById("debug");
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        width = canvas.width;
        height = canvas.height;

        readVariations();

        document.getElementById("draw").onclick = function(){ draw() };

        var anf = document.getElementById("add_new_function");
        anf.onclick = function(){
            var div;
            var input;
            var f = document.getElementById("function");
            var item = document.createElement("div");
            var nid = takeNewID();

            item.id = "f" + nid;

            div = document.createElement("div");
            div.appendChild(document.createTextNode("function"));
            item.appendChild(div);

            div = document.createElement("div");
            div.class = "coefficient";
            var cs = ['a','b','c','d','e','f'];
            for(var i in cs){
                input = document.createElement("input");
                input.type = "text";
                input.name = cs[i];
                input.value = "1";
                input.size = 4;

                (function(){
                    var input_ = input;
                    input.onchange = function(){
                        var n = Number(input_.value);
                        if(isNaN(n)){
                            input_.value = "0";
                        }else{
                            input_.value = String(n);
                        }
                    }
                })();

                div.appendChild(document.createTextNode(cs[i]));
                div.appendChild(input);
            }

            item.appendChild(div);

            div = document.createElement("div");
            div.class = "color";
            var rs = ["R","G","B"];
            for(var i in rs){
                input = document.createElement("input");
                input.type = "text"
                input.name = rs[i];
                input.value = "1";
                input.size = 4;

                (function(){
                    var input_ = input;
                    input.onchange = function(){
                        var n = Number(input_.value);
                        if(isNaN(n) || n < 0){
                            input_.value = "0";
                        }else if(n > 1){
                            input_.value = "1";
                        }else{
                            input_.value = String(n);
                        }
                    }
                })();

                div.appendChild(document.createTextNode(rs[i]));
                div.appendChild(input);
            }

            item.appendChild(div);

            div = document.createElement("div");
            div.class = "weight";
            span = document.createElement("span");
            span.appendChild(document.createTextNode("weight: "));
            input = document.createElement("input");
            input.type = "text";
            input.name = "weight";
            input.value = "1";
            input.size = 4;

            (function(){
                var input_ = input;
                input.onchange = function(){
                    var n = parseInt(input_.value);
                    if(isNaN(n) || n < 0){
                        input_.value = "0";
                    }else{
                        input_.value = String(n);
                    }
                }
            })();

            div.appendChild(span);
            div.appendChild(input);

            item.appendChild(div);

            div = document.createElement("div");
            input = document.createElement("input");
            input.type = "button";
            input.value = "delete";
            (function(){
                var i_ = nid;
                input.onclick = function(){
                    f.removeChild(item);
                    dropID(i_);
                }
            })();

            div.appendChild(input);
            item.appendChild(div);
            
            f.appendChild(item);
        }
    };

})();
