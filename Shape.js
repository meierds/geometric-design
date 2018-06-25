/*
This script will create a shape between 2 and 12 sides in the center of the canvas and begin spinning it. 
It will also bind tbe arrow keys to allow the user to control the number of sides and speed of rotation.
*/
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var p = new Point (canvas.width/2,canvas.height/2);
var angle = 1;
var MAX_SIDES = 12;
var sides = Math.floor(Math.random()*MAX_SIDES);
if(sides < 3){sides = 3};
var MIN_SIDES = 2;
var length;
var color = getRandomColor();

init();

function init(){
    if(canvas.height < canvas.width){
        length = (1/3)* canvas.height;
    }else{length = (1/3)*canvas.width;}

    startShape = new Shape(p,length,sides);
    startShape.draw();
    
    var move = setInterval(function(){
        animate(startShape);    
    },10,sides,angle);
}

function animate(shape){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    updateShape(shape, sides);
    shape.draw();
}

function updateShape(shape,numSides){
    shape.rotate(angle);
  
    if(shape.Sides < numSides){
        shape.addSides(numSides - shape.Sides);
    }
    if(shape.Sides > numSides){
        shape.subtractSides(shape.Sides - numSides);
    }
}

//defines the Shape object
function Shape(c,length,sides){
    if(sides<2){sides = 2;}
   
    this.center = new Point(c.x,c.y);
    this.radius = length/2;
    this.vertices = [];
    this.Sides = this.vertices.length;

    this.rotate = function(angle){
        for(var i = 0;i<=this.vertices.length - 1;i++){
            this.vertices[i].rotateXY(angle,this.center);
        }
    }

    this.addSides = function(sidesToAdd){
        if(this.Sides + sidesToAdd > MAX_SIDES){sidesToAdd = MAX_SIDES - this.Sides}
        if(sidesToAdd!=0){    
            for(var i = 0; i<sidesToAdd; i++){ 
                var newVertex = new Point(0,0)
                this.vertices.push(newVertex);
            }
            this.Sides = this.vertices.length;
        }

        this.recalculateVertices();
    }
    this.subtractSides = function(sidesToSub){
        if(this.Sides - sidesToSub < MIN_SIDES){sidesToSub = this.Sides - MAX_SIDES}
        if(sidesToSub != 0){
            this.vertices.splice(0,sidesToSub);
            this.recalculateVertices();
            this.Sides = this.vertices.length;
        }
    }
    this.recalculateVertices = function(){
        var angle = (2*Math.PI)/this.vertices.length;

        for(var i = 0;i<=this.vertices.length - 1;i++){
            this.vertices[i].x = this.center.x + this.radius*Math.cos(angle*(i+1));
            this.vertices[i].y = this.center.y + this.radius*Math.sin(angle*(i+1));
        }
    }

    this.draw = function(){
        ctx.beginPath();

        ctx.moveTo(this.vertices[0].x,this.vertices[0].y)
        for(var i=1;i<=this.vertices.length-1;i++){
            ctx.lineTo(this.vertices[i].x,this.vertices[i].y);
        }
        ctx.fillStyle = color;
        ctx.strokeStyle = ctx.fillStyle;
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
    this.addSides(sides);
}

//defines the point object
function Point(x,y){
    this.x = x;
    this.y = y;

    this.rotateXY = function(angle, origin){
        angle = (Math.PI / 180) * angle;
        
        var newx = ((this.x - origin.x) * Math.cos(angle)) - ((this.y - origin.y) * Math.sin(angle)) + origin.x;
        var newy = ((this.x - origin.x) * Math.sin(angle)) + ((this.y -origin.y)* Math.cos(angle)) + origin.y;
        
        this.x = newx;
        this.y = newy;
    }

    this.translate = function(xdist, ydist){
        this.x += xdist;
        this.y += ydist;
    }
}
//randomizes fill color by generating a hex value
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
//key binding
document.onkeydown = function(e) {
    e = e || window.event;
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
    switch(e.which || e.keyCode) {
        case 37: //left
            angle--; 
        break;

        case 38: //up
            if(sides + 1 < MAX_SIDES){
                sides++;
            }
        break;
        case 39: //right
            angle++;
        break;
        case 40: //down
            if(sides > MIN_SIDES){        
                sides--;
            }
        break;
        default: 
        return; 
    }   
}