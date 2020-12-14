class Block{
    constructor(x, w, m, v){
        this.x = x;
        this.y = height - w;
        this.w = w;
        this.m = m;
        this.v = v;
    }

    show(){
        image(blockImg, this.x, this.y, this.w, this.w);
    }

    move(){
        this.x += this.v;
    }
}