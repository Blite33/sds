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
  constructor(x, y, theImage, scale, xLevel){
    this.color = 'black';
    this.x = x;
    this.y = y;
    this.image = theImage;
    this.scale = scale;
    this.superXLevel = xLevel;
  }

  display() {
    image(this.image, this.x, this.y, this.scale, this.scale);
  }
}

class Mob {
  constructor(x, frame0, frame1, scale, xLevel){
    this.x = x;
    this.y = (height*2/3);
    this.imgFrame0 = frame0;
    this.imgFrame1 = frame1;
    this.image = frame0;
    this.scale = scale;
    this.goalX = 0;
    this.goalY = (height*2/3);
    this.superXLevel = xLevel
  }

  display() {
    image(this.image, this.x, this.y, this.scale, this.scale);
  }

  move() {
    if(this.x !== this.goalX){
      this.image = this.imgFrame1;
      if(this.x - this.goalX > 2){
        // Backwards
        this.x -= (this.goalX / this.x) * 9;
      }
      else if(this.x - this.goalX < -2){
        // Forward
        this.x += (this.goalX / this.x) * 3;
      }
      else{
        this.x = this.goalX;
      }
    }
    else{
      this.image = this.imgFrame0;
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
  sunTexture = new Texture(100, 100, loadImage("assets/sun_softer.png"), 100);
  texturesToDisplay.push(sunTexture);
  for(let i=0; i<10; i++){
    let grassTexture = new Texture(i*width/10, height - 150, loadImage("assets/pixil-frame-0.png"), width/10, 0);
    texturesToDisplay.push(grassTexture);
  }

  characterTexture = new Mob(100, loadImage("assets/char-pixil-frame-0.png"), loadImage("assets/char-pixil-frame-1.png"), 100, 0)
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