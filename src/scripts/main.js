// Script by FG 14.12.2020

let blockImg;
let block1;
let block2;

function preload(){
    blockImg = loadImage('/src/img/block.png');    
}

function setup() {
    createCanvas(windowWidth, 250);
    //           x-Pos. Breite Masse Geschw.
    block1 = new Block(100, 50, 1, 0);
    block2 = new Block(500, 200, 10, -1);
}
  
  function draw() {
    background(200);

    block1.move();
    block2.move();

    block1.show();
    block2.show();
  }