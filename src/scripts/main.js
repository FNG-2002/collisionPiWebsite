// Script by FG 14.12.2020

let blockImg;
let block1;
let block2;

let counter = 0;

let mass = 100;


// Explizites Euler-Verfahren
let timeSteps = 1000000;

  
// Erstellt Plot
let plot;

function preload() {
  blockImg = loadImage('/src/img/block.png');
}

function setup() {
  noLoop();

  //PI (Collision) Canvas
  var canvas = createCanvas(select('main').size()['width'], 250);
  canvas.parent('canvasHolder');

  setupGUI();

  createBlocks();

  recreatePlot();
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
      
      //console.log("x: " + Math.sqrt(block2.m)*block2.v*timeSteps + " " + "y: " + Math.sqrt(block1.m)*block1.v*timeSteps);
      
      plot.fuegePunktHinzu(Math.sqrt(block2.m)*block2.v*timeSteps, Math.sqrt(block1.m)*block1.v*timeSteps);
    }
  
    if (block1.wall()){
      block1.reverse();
      counter++;
      plot.fuegePunktHinzu(Math.sqrt(block2.m)*block2.v*timeSteps, Math.sqrt(block1.m)*block1.v*timeSteps);
    }
  
    block1.move();
    block2.move();
  }

  block1.show();
  block2.show();
  plot.aktualisierePlot();

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


  let inputDigits = createInput(mass.toString(), 'number');
  inputDigits.id('inputDigits');
  inputDigits.parent('inputDigitAmount');
  inputDigits.input(changeAmountOfDigits);

  let inputHint = createP("<strong>Achtung:</strong> <br> Bei einem Wert > 100^8 kann es lange dauern!");
  inputHint.parent('inputDigitAmount');
  inputHint.style('margin', 'unset');
  inputHint.style('margin-top', '0.2rem');
  inputHint.style('font-size', 'small');
}


function createBlocks(){
  //           x-Pos. Breite Masse Geschw.
  block1 = new Block(100, 75, 1, 0, 0);
  block2 = new Block(300, 135, (Number)(mass), -1/timeSteps, block1.w);
  counter = 0;
}


function recreatePlot(){
  // Erstellt Plot
  plot = new PlotHelper();
  plot.fuegePunktHinzu(Math.sqrt(block2.m)*block2.v*timeSteps, Math.sqrt(block1.m)*block1.v);
  plot.aktualisierePlot();
}


// ############## GUI FUNCTION SECTION ############################
function changeAmountOfDigits(){
  mass = this.value();
  createBlocks();
  plot.removePlot();
  recreatePlot();
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