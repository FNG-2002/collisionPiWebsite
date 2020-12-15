// Script by FG 14.12.2020

let blockImg;
let block1;
let block2;

let counter = 0;

function preload() {
  blockImg = loadImage('/src/img/block.png');
}

function setup() {
  createCanvas(windowWidth, 250);
  //           x-Pos. Breite Masse Geschw.
  block1 = new Block(100, 100, 1, 0);
  block2 = new Block(500, 150, 10000, -2);
}

function draw() {
  background(200);

  if (block1.collide(block2)) {
    const newV1 = block1.hit(block2);
    const newV2 = block2.hit(block1);
    block1.v = newV1;
    block2.v = newV2;
    counter++;
  }

  if (block1.wall()){
    counter++;
    block1.reverse();
  }

  block1.move();
  block2.move();

  block1.show();
  block2.show();

  print(counter);
}