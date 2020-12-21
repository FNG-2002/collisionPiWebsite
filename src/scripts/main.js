// Script by FG 14.12.2020

let blockImg;
let block1;
let block2;

let counter = 0;

let digits = 3;

// Explizites Euler-Verfahren
let timeSteps = 10000;

function preload() {
  blockImg = loadImage('/src/img/block.png');
}

function setup() {
  noLoop();
  var canvas = createCanvas(select('main').size()['width'], 250);
  canvas.parent('canvasHolder');

  setupGUI();

  createBlocks();

}

function draw() {
  background(200);

  updateCounter();

  for (let i = 0; i < timeSteps; i++) {
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
  }

  block1.show();
  block2.show();

  // Stoppt den Loop, wenn es keine Kollision mehr geben wird
  /*
  if (block1.v >= 0 && block2.v >= 0 && block1.v < block2.v){
    noLoop();
  }*/ 
}

function updateCounter(){
  let s = 'Anzahl der Kollisionen: ' + counter;
  fill(0);
  textSize(25);
  text(s, 10, 10, displayWidth, 100);
}


function setupGUI(){
  let buttonStart = createButton('Start');
  buttonStart.id('buttonStart');
  buttonStart.parent('playControls');
  buttonStart.mousePressed(toggleCalculation);


  let inputDigits = createInput((String)(digits), 'number');
  inputDigits.id('inputDigits');
  inputDigits.parent('inputDigitAmount');
  inputDigits.input(changeAmountOfDigits);

  let inputHint = createP("Achtung: <br> Bei einem Wert > 10 dauert es lange!");
  inputHint.parent('inputDigitAmount');
  inputHint.style('margin', 'unset');
  inputHint.style('margin-top', '0.2rem');
  inputHint.style('font-size', 'small');
}


function createBlocks(){
  //           x-Pos. Breite Masse Geschw.
  block1 = new Block(100, 100, 1, 0, 0);
  block2 = new Block(500, 150, pow(100, digits-1), -2/timeSteps, block1.w);

  counter = 0;
}

// ############## GUI FUNCTION SECTION ############################
function changeAmountOfDigits(){
  digits = this.value();
  createBlocks();
}


function toggleCalculation(){
  if (isLooping()){
    document.getElementById(buttonStart.id).textContent = "Start";
    noLoop();
  } else {
    document.getElementById(buttonStart.id).textContent = "Pause";
    loop();
  }
}