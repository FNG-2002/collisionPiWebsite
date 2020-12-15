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

    collide(collidingBlock){
        return !(this.x + this.w < collidingBlock.x || collidingBlock.x + collidingBlock.w < this.x)
    }

    hit(collidingBlock){
        var sumMass = this.m + collidingBlock.m;
        return ((this.m - collidingBlock.m)/sumMass)*this.v + ((2*collidingBlock.m)/sumMass)*collidingBlock.v;
    }

    wall(){
        return (this.x <= 0)
    }

    reverse(){
        this.v *= -1; 
    }

    move(){
        this.x += this.v;
    }
}