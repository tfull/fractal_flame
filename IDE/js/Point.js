function Point(x, y){
    this.x = x;
    this.y = y;
}

Point.prototype.add = function(p){
    return new Point(this.x + p.x, this.y + p.y);
}

Point.prototype.sub = function(p){
    return new Point(this.x - p.x, this.y - p.y);
}

Point.prototype.mul = function(p){
    return new Point(this.x * p.x, this.y * p.y);
}

Point.prototype.div = function(p){
    return new Point(this.x / p.x, this.y / p.y);
}

Point.prototype.scale = function(k){
    return new Point(this.x * k, this.y * k);
}

Point.prototype.apply = function(f){
    return new Point(f(this.x), f(this.y));
}

Point.prototype.toString = function(){
    return "(" + this.x + "," + this.y + ")";
}
