class PlotHelper{

    punkte = [];

    constructor(){
        
    var createPlotCanvas = function(p) {
        var width = select('main').size()['width'];
        var height = 400;
    
        // Initial setup
        p.setup = function() {
        // Create the canvas
        var canvas = p.createCanvas(width, height+100);
        canvas.parent('graphHolder');
        p.background(colorBG);
    
        // Prepare the points for the plot
        var points = [];
        var nPoints = 100;
    
        for (var i = 0; i < nPoints; i++) {
            points[i] = new GPoint(p.sin(p.TWO_PI * i / (nPoints - 1)) * Math.sqrt(block2.m) * startVel, p.cos(p.TWO_PI * i / (nPoints - 1))*Math.sqrt(block2.m) * startVel);
        }
        
    
        // Create a new plot and set its position on the screen
        p.plot = new GPlot(p);
    
        var plotWidth = width-50;
        p.plot.setDim([plotWidth, height]);
        var xPos = (width/2) - (plotWidth/2) - 50;
        p.plot.setPos(xPos, 0);
    
        //p.plot.setXLim((Math.sqrt(block2.m) * block2.v*timeSteps)*30, (Math.sqrt(block2.m) * block2.v *timeSteps* -1)*30);
        //p.plot.setYLim(Math.sqrt(block1.m) * block1.v*timeSteps, Math.sqrt(block1.m) * block1.v *timeSteps* -1);

        // Set the plot title and the axis labels
        p.plot.setPoints(points);
        p.plot.getXAxis().setAxisLabelText("x = sqrt(m1)*v1");
        p.plot.getYAxis().setAxisLabelText("y = sqrt(m2)*v2");
        p.plot.setTitleText("Phasenraumdiagramm");
    
        // Draw it!
        p.plot.defaultDraw();
        
        // Draw the plots
        // Draw the plot
        p.plot.beginDraw();
        p.plot.drawBox();
        p.plot.drawXAxis();
        p.plot.drawYAxis();
        p.plot.drawTitle();
        p.plot.drawLines();
        p.plot.endDraw();

        p.noLoop();

        p.plot.addLayer("surface", []);
        };

        
        p.refreshPlot = function(punkte){
            p.background(colorBG);
            p.plot.beginDraw();
            p.plot.drawBox();
            p.plot.drawXAxis();
            p.plot.drawYAxis();
            p.plot.drawTitle();
            p.plot.getLayer("surface").setPoints(punkte);
            p.plot.getLayer("surface").drawPoints();
            p.plot.drawLines();
            p.plot.endDraw();
        };

    };

    this.plot = new p5(createPlotCanvas);

    }

    aktualisierePlot(){
        this.plot.refreshPlot(this.punkte);
    }

    fuegePunktHinzu(x, y){
        this.punkte.push(new GPoint(x,y));
    }

    removePlot(){
        this.plot.remove();
    }

}