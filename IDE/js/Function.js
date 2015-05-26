function Function(a, b, c, d, e, f){
    this.a = Number(a);
    this.b = Number(b);
    this.c = Number(c);
    this.d = Number(d);
    this.e = Number(e);
    this.f = Number(f);
}

Function.prototype.apply = function(p, vws){
    var res = new Point(0, 0);

    for(var i in vws){
        var vw = vws[i];
        res = res.add(vw.variation(new Point(this.a * p.x + this.b * p.y + this.c, this.d * p.x + this.e * p.y + this.f).scale(vw.weight)));
    }

    return res;
}
