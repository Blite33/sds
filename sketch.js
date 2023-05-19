// 2D Game
// William Harris
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

console.log('instantiating globals...');
// instantiate grid globally...
let texturesToDisplay = [];
let mobsToDisplay = [];
let pixelSquare = 20;

//Find whichever dimension the screen is smaller in?
let maximumScreenSize;
let circleSprite;
let inputtedColor;

// find some better way than using globals.
let grassTexture;
let sunTexture;

console.log('constructing classes...');
class Texture {
  constructor(x, y, theImage, scale){
    this.color = 'black'
    this.x = x
    this.y = y
    this.image = theImage
    this.scale = scale
  }

  display() {
    image(this.image, this.x, this.y, this.scale, this.scale);
  }
}

class Mob {
  constructor(x, theImage, scale){
    this.x = x
    this.y = (height*2/3)
    this.image = theImage
    this.scale = scale
    this.goalX = 0
    this.goalY = (height*2/3)
  }

  display() {
    image(this.image, this.x, this.y, this.scale, this.scale);
  }

  move() {
    if(this.x !== this.goalX){
      if(this.x > this.goalX){
        this.x -= (this.goalX / this.x) * 3;
      }
      else if(this.x < this.goalX){
        this.x += (this.goalX / this.x) * 3;
      }
    }
  }
}

function setup() {
  console.log('setting up...')
  createCanvas(windowWidth, windowHeight);
  noStroke();
  noSmooth();
  if (width < height){
    maximumScreenSize = width;
  }
  if (width > height){
    maximumScreenSize = height;
  }

  console.log('loading assets...');
  grassTexture = new Texture(0, 0, loadImage("assets/pixil-frame-0.png"), 10);
  sunTexture = new Texture(0, 100, loadImage("assets/sun_softer.png"), 100);
  texturesToDisplay.push(sunTexture);
  texturesToDisplay.push(grassTexture);

  characterTexture = new Mob(100, loadImage("assets/char-pixil-frame-0.png"), 100)
  mobsToDisplay.push(characterTexture);
}

function draw() {
  background(0);
  
  //move
  for(let i=0; i<mobsToDisplay.length; i++){
    mobsToDisplay[i].move();
  }
  
  //draw
  for(let i=0; i<texturesToDisplay.length; i++){
    texturesToDisplay[i].display();
  }
  for(let i=0; i<mobsToDisplay.length; i++){
    mobsToDisplay[i].display();
  }
  // Maybe add another layer for background squares.
}

function mousePressed(){
  console.log('INFO mousePressed() ' + mouseX + ' ' + mouseY);

  for(let i=0; i<mobsToDisplay.length; i++){
    mobsToDisplay[i].goalX = mouseX;
  }
}