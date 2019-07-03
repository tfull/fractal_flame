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

Point.prototype.r = function(){
    return Math.sqrt(this.x * this.x + this.y * this.y);
}

Point.prototype.r2 = function(){
    return this.x * this.x + this.y * this.y;
}

Point.prototype.theta = function(){
    return Math.atan(this.x / this.y);
}

Point.prototype.phi = function(){
    return Math.atan(this.y / this.x);
}

Point.prototype.toString = function(){
    return "(" + this.x + "," + this.y + ")";
}
