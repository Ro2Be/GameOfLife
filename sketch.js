function Cell(a, x, y){
	this.a = a; //alive 1 death 0
	this.b = 0; //#surrounding alives
	this.c = 255; //colour red
	this.d = 255; //colour blue
	this.x = x;
	this.y = y;
	
	this.flip = function(){
		if(this.a === 0) {this.a = 1; return;}
		if(this.a === 1) {this.a = 0; this.c = 255; this.d = 255;}
	}
	
	this.show = function(){
		fill(this.a * random(0, 255), this.a * this.c, this.a * this.d);
		rect(this.x, this.y, width/(s * 1.2), height/(s * 1.2));
	}
}

board = [];
var button;
var slider;
timer = 0;
s = 13; //size
t = 0; //turn

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
	slider = createSlider(0, 100, 0);
  for(y = 0; y < s; y++){
  	for(x = 0; x < s; x++){
  		newCell = new Cell(0, (0.5 + x) * width / s, (0.5 + y) * height / s);
  		board.push(newCell);
  	}
  }
  
	setInterval(timing, 100);
	function timing() {timer += 1;}
}

function mouseClicked() {
	if(mouseX < width && mouseY < height) {board[floor(s * mouseX / width) + s * floor(s * mouseY / height)].flip();}
	if(t === 0) {t = 1; board[floor(s * mouseX / width) + s * floor(s * mouseY / height)].c = 155; board[floor(s * mouseX / width) + s * floor(s * mouseY / height)].d = 0; return}
	if(t === 1) {t = 0; board[floor(s * mouseX / width) + s * floor(s * mouseY / height)].c = 0; board[floor(s * mouseX / width) + s * floor(s * mouseY / height)].d = 155;}
  
}

function play() {
	for(y = 0; y < s; y++){
  	for(x = 0; x < s; x++){
  		board[x + s * y].b = 0;
  		if(x > 0 			&& y > 0) 		{board[x + s * y].b += board[(x - 1) + s * (y - 1)].a}
  		if(y > 0) 				 					{board[x + s * y].b += board[(x)		  + s * (y - 1)].a}
  		if(x < s - 1 	&& y > 0) 		{board[x + s * y].b += board[(x + 1) + s * (y - 1)].a}
  		if(x > 0) 				 					{board[x + s * y].b += board[(x - 1) + s * (y) 	 ].a}
  		if(x < s - 1) 				 			{board[x + s * y].b += board[(x + 1) + s * (y)  	 ].a}
  		if(x > 0 			&& y < s - 1) {board[x + s * y].b += board[(x - 1) + s * (y + 1)].a}
  		if(y < s - 1)				 	 			{board[x + s * y].b += board[(x) 	 	+ s * (y + 1)].a}
  		if(x < s - 1 	&& y < s - 1) {board[x + s * y].b += board[(x + 1) + s * (y + 1)].a}
  	}
  }
  for(y = 0; y < s; y++){
  	for(x = 0; x < s; x++){
  		if(board[x + s * y].a === 1){
  			if(board[x + s * y].b < 2 || board[x + s * y].b > 3) {board[x + s * y].flip();}
  		}
  		else {
  			if(board[x + s * y].b === 3) {board[x + s * y].flip();}
  		}
  	}
  }
}

function draw() {
  for(i = 0; i < board.length; i++){
  	board[i].show();
  }
  if(timer * slider.value() >= 100) {timer = 0; play();}
}