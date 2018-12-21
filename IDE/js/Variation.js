const variations = (function(){
    var pi = 3.14159265358979323846;

    function v0(p){
        return p;
    }

    function v1(p){
        return p.apply(Math.sin);
    }

    function v2(p){
        return p.scale(1 / p.r2());
    }

    function v3(p){
        var r2 = p.r2();
        return new Point(p.x * Math.sin(r2) - p.y * Math.cos(r2), p.x * Math.cos(r2) + p.y * Math.sin(r2));
    }

    function v4(p){
        var r = p.r();
        return new Point((p.x - p.y) * (p.x + p.y) / r, 2 * p.x * p.y / r);
    }

    function v5(p){
        var theta = p.theta();
        var r = p.r();
        return new Point(theta / pi, r - 1);
    }

    function v6(p){
        var r = p.r();
        var theta = p.theta();
        return new Point(r * Math.sin(theta + r), r * Math.cos(theta - r));
    }

    function v7(p){
        var r = p.r();
        var theta = p.theta();
        return new Point(r * Math.sin(theta * r), r * (- Math.cos(theta * r)));
    }

    function v8(p){
        var r = p.r();
        var theta = p.theta();
        return (new Point(Math.sin(pi * r), Math.cos(pi * r))).scale(theta / pi);
    }

    function v9(p){
        var r = p.r();
        var theta = p.theta();
        return (new Point(Math.cos(theta) + Math.sin(r), Math.sin(theta) - Math.cos(r))).scale(1 / r);
    }

    function v10(p){
        var r = p.r();
        var theta = p.theta();
        return new Point(Math.sin(theta) / r, r * Math.cos(theta));
    }

    function v11(p){
        var r = p.r();
        var theta = p.theta();
        return new Point(Math.sin(theta) * Math.cos(r), Math.cos(theta) * Math.sin(r));
    }

    function v12(p){
        var r = p.r();
        var theta = p.theta();
        var p03 = Math.pow(Math.sin(theta + r), 3.0);
        var p13 = Math.pow(Math.cos(theta - r), 3.0);
        return new Point(r * (p03 + p13), r * (p03 - p13));
    }

    return [v0,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12];

})();
