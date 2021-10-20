function Color(r, g, b){
    this.r = Number(r);
    this.g = Number(g);
    this.b = Number(b);
}

Color.prototype.add = function(c){
    return new Color(this.r + c.r, this.g + c.g, this.b + c.b);
}

Color.prototype.sub = function(c){
    return new Color(this.r - c.r, this.g - c.g, this.b - c.b);
}

Color.prototype.scale = function(k){
    return new Color(this.r * k, this.g * k, this.b * k);
}

Color.prototype.toString = function(){
    return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
}
