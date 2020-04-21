var runright;
var runleft;
var idleright;
var idleleft;
var walkleft;
var walkright;
var jumpright;
var jumpleft;
var saw;
var portal;
var portal2;
var idle = 1;
var deathCount = 0;
var jumpCounter = 0;
var levelstartx = 50;
var levelstarty = 500;
var background1;
var scene = 0;
xoffset = 600;
yoffset = 400
var circle = {
    x:levelstartx,
    y:levelstarty,
	r:25,
    width:30,
	height:112,
    xv:0,
    yv:-5,
    gravity:0.8,
};

function setup() {
	//createCanvas(3000,3000);
	createCanvas(1200,800);
	runleft = createImg('assets/runleft.gif');
	runright = createImg('assets/runright.gif');
	idleleft = createImg('assets/idleleft.gif');
	idleright = createImg('assets/idleright.gif');
	walkright = createImg('assets/walkright.gif');
	walkleft = createImg('assets/walkleft.gif');
	jumpright = createImg('assets/jumpright.gif')
	jumpleft = createImg('assets/jumpleft.gif')
	portal = createImg('assets/portal.gif');
	portal2 = createImg('assets/portal2.gif');
	saw = createImg('assets/saw.gif');
	background1 = createImg('assets/background1.png');
	background1.hide();
	


};

function hide(){
	saw.hide();
	portal.hide();
	portal2.hide();
}

function displayText(){
	fill(255,255,255)
    strokeWeight(1);
	textSize(20);
	//text("Deaths: " + deathCount, circle.x - 550, circle.y - 350 )
   	fill(204,0,204); 
	//dispaly hitbox of player
	noFill();
	stroke(255,255,255);
	//rect(circle.x,circle.y,circle.width,circle.height);
//	text(round(circle.xv),200,200);
//	text(round(circle.yv),400,200);.
	
	
}

function phys(){
	jumpCounter++;
	//ADDING VELOCITY VALUES TO X AND Y POSITION
    circle.x += circle.xv;
    circle.y += circle.yv;
	
	//DEATH WHEN FALLING OUT OF THE MAP.
    if(circle.y>height+1000){
		death();
    }
	//adding gravity to player
	circle.yv +=circle.gravity;
	
}

function animation(){
	
	if(circle.yv < 0 && circle.xv === 7 && circle.xv != 3 ){
		//image(jumpright, circle.x-70, circle.y, runright.width ,runright.height );
		jumpright.position(xoffset-70, yoffset);
		jumpright.show();
	} else {
		jumpright.hide();
	}
	
	if(circle.yv < 0 && circle.xv === -7 && circle.xv != -3){
		//image(jumpleft, circle.x, circle.y, runright.width ,runright.height );
		jumpleft.position(xoffset, yoffset);
		jumpleft.show();
	} else {
		jumpleft.hide();
	}
	
	if(circle.xv === 7 && circle.yv > -1){
		//image(runright, circle.x-70, circle.y, runright.width ,runright.height );
		runright.position(xoffset - 70, yoffset);	
		runright.show();
	} else {
		runright.hide();
	}
	
	if(circle.xv === -7 && circle.yv > -1){
		//image(runleft, circle.x-20 , circle.y, runleft.width ,runleft.height );
		runleft.position(xoffset-20, yoffset);
		runleft.show();
	} else {
		runleft.hide();
	}
	
	if(idle === 2 && circle.xv != -7 && circle.xv != -3){
		//image(idleleft, circle.x, circle.y-12, idleleft.width ,idleleft.height );
		idleleft.position(xoffset, yoffset - 12);
		idleleft.show();
	} else {
		idleleft.hide();
	}
	
	if(idle === 1 && circle.xv != 7 && circle.xv != 3){
		//image(idleright, circle.x + 5 , circle.y-12, idleleft.width ,idleleft.height );
		idleright.position(xoffset + 5, yoffset - 12);
		idleright.show();
	} else {
		idleright.hide();
	}
	
	if(circle.xv === 3){
		//image(walkright, circle.x-10, circle.y-8, walkright.width ,walkright.height );
		walkright.position(xoffset-10, yoffset - 8);
		walkright.show();
	} else {
		walkright.hide();
	}
	if(circle.xv === -3){
		//image(walkleft, circle.x-20, circle.y-8, walkleft.width ,walkleft.height );
		walkleft.position(xoffset-20, yoffset - 8);
		walkleft.show();
	} else {
		walkleft.hide();
	}
}

function movement(){
	if (keyIsDown(LEFT_ARROW)){
		circle.y = circle.y - 1;
    	circle.xv =+ -7;
		idle = 2;
	}

  	if (keyIsDown(RIGHT_ARROW)){
		circle.y = circle.y - 1;
    	circle.xv =+ 7;
		idle = 1;
	}
	
  	if (keyIsDown(UP_ARROW) && jumpCounter > 30 && circle.yv < 3 ){
		circle.y = circle.y - 2;
		circle.yv=- 20;
    	jumpCounter = 0;
		
	}
	
	if (keyIsDown(RIGHT_ARROW) && keyIsDown(SHIFT)){
		//circle.y = circle.y - 1;
    	circle.xv =+ 3;
		idle = 1;
	}
	
	if (keyIsDown(LEFT_ARROW) && keyIsDown(SHIFT)){
		//circle.y = circle.y - 1;
    	circle.xv =+ -3;
		idle = 2;
	}
    
    if (keyIsDown(DOWN_ARROW)){
			circle.y += 1;
	}

}

function death(){
	circle.xv = 0;
	circle.yv = 0;
	circle.y = levelstarty;
	circle.x = levelstartx;
	deathCount++;
	
}

//Constructor function for platforms
function platform(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
    fill(0);
    stroke(255,255,255);
	rect(this.x, this.y,this.width,this.height);
		if(circle.x + circle.width > this.x && circle.x < this.x + this.width && circle.y + circle.height > this.y && circle.y < this.y + this.height && circle.y + circle.height < this.y + circle.yv){
			circle.y = this.y - circle.height;
			circle.xv *= 0.5;
			circle.yv *= 0;
			circle.yv +=circle.gravity;
	} 
	
}

function solidplatform(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	noStroke();
    fill(160,160,160,80);
	rect(this.x, this.y,this.width,this.height);
		if(circle.x + circle.width > this.x && circle.x < this.x + this.width && circle.y + circle.height > this.y && circle.y < this.y + this.height && circle.y + circle.height < this.y + circle.yv + 1){
			circle.y = this.y - circle.height;
			circle.xv *= 0.5;
			circle.yv *= 0;
			circle.yv +=circle.gravity;
		
	} 
	if(circle.x + circle.width > this.x && circle.x < this.x + this.width && circle.y + circle.height > this.y && circle.y < this.y + this.height){
		circle.x -= circle.xv;
        circle.xv *= 0;
		
	}
}

//SLIDE PLATFORMS
function slideplatform(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
    fill(0,204,204);
	rect(this.x, this.y,this.width,this.height);
		
	if(circle.x + circle.width > this.x && circle.x < this.x + this.width && circle.y + circle.height > this.y && circle.y < this.y + this.height && circle.y + circle.height < this.y + circle.yv + 1)
	{
        circle.y = this.y - circle.height;
        circle.xv *= 0.99;
        circle.yv *= 0;
		circle.yv +=circle.gravity;
		
	}
}

//TEMPLATE FOR ANY BLOCK YOU WANT TO KILL YOU.
function killplatform(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	rect(this.x, this.y,this.width,this.height);
    fill(160,160,160);
    triangle(this.x + this.width/2, this.y, this.x, this.y + this.height, this.x + this.width, this.y + this.height);
		
	if(circle.x + circle.width > this.x && circle.x < this.x + this.width && circle.y + circle.height > this.y && circle.y < this.y + this.height){
		death();
	}
}

// PLACES A SPIKE
function spike(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	//rect(this.x, this.y,this.width,this.height);
	noStroke();
    fill(160,160,160);
    triangle(this.x + this.width/2, this.y, this.x, this.y + this.height, this.x + this.width, this.y + this.height);
		
	if(circle.x + circle.width > this.x && circle.x < this.x + this.width && circle.y + circle.height > this.y && circle.y < this.y + this.height){
		death();
	}
}

// PLACES AN UPSIDE DOWN SPIKE
function uSpike(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	//rect(this.x, this.y,this.width,this.height);
    fill(160,160,160);
    triangle(this.x, this.y, this.x + this.width, this.y, this.x + this.width/2, this.y + this.height);
		
	if(circle.x + circle.width > this.x && circle.x < this.x + this.width && circle.y + circle.height > this.y && circle.y < this.y + this.height){
		death();
	}
}

//Saw Blade constructor
function sawblade(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
    this.x += 10;
    fill(235,0,0);
    //rect(this.x,this.y,this.width,this.height);
	image(saw,this.x, this.y,this.width, this.height)
	if(circle.x + circle.width > this.x && circle.x < this.x + this.width && circle.y + circle.height > this.y && circle.y < this.y + this.height){
		death();
	}
}

//level exit portal
function endplatform(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
    fill(51,51,255);
    strokeWeight(3);
    stroke(255,255,255);
//    ellipseMode(CORNER);
//    ellipse(this.x, this.y, this.width, this.height);
	image(portal,this.x, this.y, this.width, this.height);
		
	if(circle.x + circle.width > this.x && circle.x < this.x + this.width && circle.y + circle.height > this.y && circle.y < this.y + this.height)
	{
        circle.xv *= 0;
        circle.yv *= 0;
        circle.y = levelstarty;
		circle.x = levelstartx;
		scene++;
		
	}
}

//level game restart portal
function endgameplatform(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
    fill(51,51,255);
    strokeWeight(3);
    stroke(255,255,255);
//    ellipseMode(CORNER);
//    ellipse(this.x, this.y, this.width, this.height);
	image(portal,this.x, this.y, this.width, this.height);
		
	if(circle.x + circle.width > this.x && circle.x < this.x + this.width && circle.y + circle.height > this.y && circle.y < this.y + this.height)
	{
        circle.xv *= 0;
        circle.yv *= 0;
        circle.y = levelstarty;
		circle.x = levelstartx;
		scene = 0;
		
	}
}

// PUTS A PORTAL AT PLAYER SPAWN
function enterportal(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	image(portal2,this.x-50, this.y, this.width, this.height);
		
}

function wall(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	noStroke();
	fill(160,160,160,80);
	rect(this.x, this.y, this.width, this.height);
		
	if(circle.x + circle.width > this.x && circle.x < this.x + this.width && circle.y + circle.height > this.y && circle.y < this.y + this.height)
	{
		circle.x -= circle.xv;
        circle.xv *= 0;
		
	}
}

// MOVING PLATFORM
function moveplatform(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;		
	} 
moveplatform.prototype.move = function(){
	this.x += 2;

    rect(this.x, this.y,this.width,this.height);
    		if(circle.x + circle.width > this.x && circle.x < this.x + this.width && circle.y + circle.height > this.y && circle.y < this.y + this.height && circle.y + circle.height < this.y + circle.yv){
			circle.y = this.y - circle.height;
			circle.xv = 2;
			circle.yv *= 0;
			circle.yv +=circle.gravity;
            }
}


//start button
function startButton(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
    fill(0);
    stroke(255,255,255);
	rect(this.x, this.y,this.width,this.height);
	fill(255,255,255);
	textSize(50);
	text("START", this.x + 25, this.y + 65);
		if(circle.x + circle.width > this.x && circle.x < this.x + this.width && circle.y + circle.height > this.y && circle.y < this.y + this.height)
	{
        circle.xv *= 0;
        circle.yv *= 0;
        circle.y = levelstarty;
		circle.x = levelstartx;
		scene++;

		
	} 
}

//var startplat2 = new moveplatform(-10,700,300,50);

function draw() {
	background(0);
	//background1.position(0,0,1200,800);
	translate(-circle.x + xoffset, -circle.y + yoffset);
	movement();
	phys();
	animation();
	displayText();
	hide();
	//startplat2.move();

    
    //start screen
    if(scene === 0){
		levelstart();
	
	}
	
	//level 1
	if(scene === 1){
		level1();

	}
	
	//level 2
	if(scene === 2){
		level2();
	}
	
	//level 3
	if(scene === 3){
		level3();
	}
	
	//level 4 
	if(scene === 4){
		level4();
	}
	
	//level 5
	if (scene === 5){
		level5();
	}
	
	// level 6
	if (scene === 6){
		level6();
	}
	
	//level 7
	if (scene === 7){
		level7();
	}

};