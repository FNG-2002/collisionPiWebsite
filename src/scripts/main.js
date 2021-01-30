// Script by FG 14.12.2020

let blockImg;

let block1;
let block2;

let counter = 0;

let mass = 100;

let startVel = -4;

let colorBG = '#ccc9c2';


// Explizites Euler-Verfahren
let timeSteps = 1000000;

  
// Erstellt Plot
let plot;

function preload() {
  blockImg = loadImage('src/img/block.png');
}

function setup() {
  noLoop();
  //PI (Collision) Canvas
  var canvas = createCanvas(select('main').size()['width'], 250);
  canvas.parent('canvasHolder');
  
  
  createBlocks();
  
  setupGUI();
  
  recreatePlot();

  // ??? WHY ???
  canvas.width = select('main').size()['width'];
}

// Entfernt, weil auf dem Handy beim scroll resize() getriggered wird....nervig!
/*
function windowResized() {
  resizeCanvas(select('main').size()['width'], 250);
  createBlocks();
  redrawBlocksAndCounter();
  if (isRealValue(plot)){
    plot.removePlot();
    recreatePlot();
  }
}
*/
function draw() {
  background(colorBG);

  updateCounter();

  if (isLooping()){
    for (let i = 0; i < timeSteps; i++) {
      if (block1.collide(block2)) {
        const newV1 = block1.hit(block2);
        const newV2 = block2.hit(block1);
        block1.v = newV1;
        block2.v = newV2;
        counter++;
        
        //console.log("x: " + Math.sqrt(block2.m)*block2.v*timeSteps + " " + "y: " + Math.sqrt(block1.m)*block1.v*timeSteps);
        if (isRealValue(plot)){
          plot.fuegePunktHinzu(Math.sqrt(block2.m)*block2.v*timeSteps, Math.sqrt(block1.m)*block1.v*timeSteps);
        }
      }
    
      if (block1.wall()){
        block1.reverse();
        counter++;
        
        if (isRealValue(plot)){
          plot.fuegePunktHinzu(Math.sqrt(block2.m)*block2.v*timeSteps, Math.sqrt(block1.m)*block1.v*timeSteps);
        }
      }
    
      block1.move();
      block2.move();
    }
    
  }

  block1.show();
  block2.show();
  if (isRealValue(plot)){
    plot.aktualisierePlot();
  }

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

  let buttonReset = createButton('Reset');
  buttonReset.id('buttonReset');
  buttonReset.parent('playControls');
  buttonReset.style('float', 'right');
  buttonReset.mousePressed(resetAnim);


  let inputDigits = createInput(mass.toString(), 'number');
  inputDigits.id('inputDigits');
  inputDigits.parent('inputDigitAmount');
  inputDigits.attribute('min', '1');
  inputDigits.input(changeAmountOfDigits);

  let inputVelocity = createInput(startVel.toString(), 'number');
  inputVelocity.id('inputVelocityInput');
  inputVelocity.parent('inputVelocity');
  inputVelocity.input(changeVelocity);

  let inputHint = createP("<strong>Achtung:</strong> <br> Bei einem Wert > 100^8 kann es lange dauern!");
  inputHint.parent('inputDigitAmount');
  inputHint.style('margin', 'unset');
  inputHint.style('margin-top', '0.2rem');
  inputHint.style('font-size', 'small');


  let checkboxGraph = select('#checkboxGraph');
  checkboxGraph.changed(toggleGraph);

}


function createBlocks(){
  //           x-Pos. Breite Masse Geschw.
  block1 = new Block(100, 75, 1, 0, 0);
  block2 = new Block(300, 135, (Number)(mass), (Number)(startVel)/timeSteps, block1.w);
  counter = 0;
}


function recreatePlot(){
  // Erstellt Plot
  plot = new PlotHelper();
  plot.fuegePunktHinzu(Math.sqrt(block2.m)*block2.v*timeSteps, Math.sqrt(block1.m)*block1.v);
  plot.aktualisierePlot();
}

function isRealValue(obj){
 return obj && obj !== 'null' && obj !== 'undefined';
}


// ############## GUI FUNCTION SECTION ############################
function changeAmountOfDigits(){
  if (this.value() != ""){
    if (this.value() > 0){
      document.getElementById('alert').style.display = "none";
      buttonStart.disabled = false;
      buttonReset.disabled = false;
      document.getElementById('inputVelocityInput').disabled = false;
      document.getElementById('checkboxGraph').disabled = false;
      mass = this.value();
      createBlocks();
      if (isRealValue(plot)){
        plot.removePlot();
        recreatePlot();
      }
      redrawBlocksAndCounter();
    } else {
      buttonStart.disabled = true;
      buttonReset.disabled = true;
      document.getElementById('inputVelocityInput').disabled = true;
      document.getElementById('checkboxGraph').disabled = true;
      document.getElementById('alert').style.display = null;
      //alert("Die Masse muss größer als 0 sein!");
    }
  } else {
    buttonStart.disabled = true;
    buttonReset.disabled = true;
    document.getElementById('inputVelocityInput').disabled = true;
  }
}

function resetAnim(){
  createBlocks();
  redrawBlocksAndCounter();
  if (isRealValue(plot)){
    plot.punkte = [];
    plot.fuegePunktHinzu(Math.sqrt(block2.m)*block2.v*timeSteps, Math.sqrt(block1.m)*block1.v);
    plot.aktualisierePlot();
  }
}

function changeVelocity(){
  startVel = this.value();
  createBlocks();
  if (isRealValue(plot)){
    plot.removePlot();
    recreatePlot();
  }
  redrawBlocksAndCounter();
}


function redrawBlocksAndCounter(){
  background(colorBG);

  updateCounter();

  block1.show();
  block2.show();
  if (isRealValue(plot)){
    plot.aktualisierePlot();
  }
}


function toggleCalculation(){
  if (isLooping()){
    document.getElementById(buttonStart.id).textContent = "Start";
    document.getElementById('inputVelocityInput').disabled = false;
    document.getElementById('inputDigits').disabled = false;
    document.getElementById('checkboxGraph').disabled = false;
    noLoop();
  } else {
    document.getElementById(buttonStart.id).textContent = "Pause";
    document.getElementById('inputVelocityInput').disabled = true;
    document.getElementById('inputDigits').disabled = true;
    document.getElementById('checkboxGraph').disabled = true;
    loop();
  }
}


function toggleGraph(){
  if (this.checked()){
    select('#graphHolder').style('display', '');
    createBlocks();
    recreatePlot();
    redrawBlocksAndCounter();
  } else {
    plot.removePlot();
    plot = null;
    select('#graphHolder').style('display', 'none');
    createBlocks();
    redrawBlocksAndCounter();
  }
}