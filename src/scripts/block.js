class Block{
    constructor(x, w, m, v, xConstrain){
        this.x = x;
        this.y = height - w;
        this.w = w;
        this.m = m;
        this.v = v;
        this.xc = xConstrain;
    }

    show(){
        let xCon = constrain(this.x, this.xc, 900000);
        image(blockImg, xCon, this.y, this.w, this.w);
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