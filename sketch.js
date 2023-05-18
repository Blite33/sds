// 2D Game
// William Harris
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

console.log('instantiating globals...');
// instantiate grid globally...
let texturesToDisplay = [];
let pixelSquare = 20;

//Find whichever dimension the screen is smaller in?
let maximumScreenSize;
let circleSprite;
let inputtedColor;

let grassTexture;

console.log('constructing classes...');
class Texture {
  constructor(x, y, theImage, scale){
    this.color = 'black'
    this.x = x
    this.y = y
    this.image = theImage
    this.scale = scale
    this.goalX = 0
    this.goalY = (height*2/3)
  }

  display() {
    image(this.image, this.x, this.y, this.scale, this.scale);
  }

  move() {
    // NEW make a system to move a single texture around the screen left and right by using mouse position.
    this.x += 1
    this.y += 1
  }
}

function setup() {
  console.log('setting up...')
  createCanvas(windowWidth, windowHeight);
  noStroke();
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
}

function draw() {
  // Background might be nice. IDK if that will change much if everything is just grid of pixels.
  // It might be better to have a grid background fill function that's called to change the background.
  // There should also be a fade to black kind of function that will fade all pixels to black.
  background(0);
  
  for(let x=0; x<texturesToDisplay.length; x++){
    texturesToDisplay[x].display();
  }
}