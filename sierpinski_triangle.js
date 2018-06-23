var counter = 0;
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var counter = 10;
var color = 'green';

if(canvas.height < canvas.width){
    var height = canvas.height;
}
else{
    var height = canvas.width;
}

var center = new Point(canvas.width/2,canvas.height/2);
var p1 = new Point(center.x - .5*height, center.y + .5*height)
var p2 = new Point(center.x + .5*height, center.y + .5*height);
var p3 = new Point(center.x, center.y -.5*height);

draw();

function draw(){
    drawTriangle(p1,p2,p3);

    sierpinski(p1,p2,p3);
}

function sierpinski(p1,p2,p3){
    if (counter <= 1){
        return;
    }
    counter = counter - 1;

    var new1 = centerPoint(p2,p3);
    var new2 = centerPoint(p1,p3);
    var new3 = centerPoint(p1,p2);

    drawTriangle(new1,new2,new3,ctx);

    sierpinski(new1,p2,new3,counter);
    sierpinski(new1,new2,p3,counter);
    sierpinski(p1,new2,new3,counter);
    counter++;
}

function Point(x, y){
    this.x = x;
    this.y = y;
}
function drawTriangle(left,right,top){
    ctx.beginPath();
    ctx.moveTo(left.x,left.y);
    ctx.lineTo(top.x,top.y);
    ctx.lineTo(right.x,right.y);
    ctx.closePath();
    ctx.stroke();
}

function centerPoint(p1,p2){
    return new Point ((p1.x + p2.x)/2,(p1.y+p2.y)/2);
} 

/*
var tri = new Triangle(canvas.width/2,canvas.height/2,250);
var tri1 = new Triangle(tri.top[0], (tri.right[1] - tri.height/2 + .5*tri.ri), tri.height/2);
var tri2 = new Triangle(tri1.top[0],tri.mid[1] - (tri.ri/2),tri1.height/2)
function Triangle(midx,midy, length){
    this.height = length;
    this.mid = [midx,midy];
    this.ri = .5*length*Math.tan(30*(Math.PI/180));
    this.ro = length - this.ri;
    this.top = [midx , midy - this.ro];
    this.left = [midx - (length/2),midy + this.ri];
    this.right = [midx + (length/2),midy + this.ri];

    this.draw = function(top,left,right){
        ctx.beginPath();
        ctx.moveTo(this.top[0],this.top[1]);
        ctx.lineTo(this.left[0],this.left[1]);
        ctx.lineTo(this.right[0],this.right[1]);
        ctx.closePath();
        ctx.stroke();
    }
    this.UpsideDown = function(){
        this.left[1] = midy - this.ri;
        this.top[1] = midy + this.ro;
        this.right[1] = midy - this.ri;
        this.draw();
    }
}*/
