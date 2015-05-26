const variations = (function(){

    function R(p){
        return Math.sqrt(p.x * p.x + p.y * p.y);
    }

    function R2(p){
        return p.x * p.x + p.y * p.y;
    }

    function v0(p){
        return p;
    }

    function v1(p){
        return p.apply(Math.sin);
    }

    function v2(p){
        return p.scale(1 / R2(p));
    }

    return [
        [ v0, "(x, y)" ],
        [ v1, "(\\sin{x}, \\sin{y})" ],
        [ v2, "\\displaystyle \\frac{1}{r^2}(x, y)" ],
    ];

})();
