// 2D Game
// William Harris
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

console.log('instantiating globals...');
// instantiate grid globally...
let grid = [];
let pixelSquare = 20;

//Find whichever dimension the screen is smaller in?
let maximumScreenSize;
let circleSprite;
let inputtedColor;

console.log('loading assets...');

console.log('constructing classes...');
class Texture {
  constructor(x, y, theImage){
    this.color = 'black'
    this.x = x
    this.y = y
    this.image = loadImage(theImage)
  }

  display() {
    image(this.image, this.x, this.y, );
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

}

function draw() {
  // Background might be nice. IDK if that will change much if everything is just grid of pixels.
  // It might be better to have a grid background fill function that's called to change the background.
  // There should also be a fade to black kind of function that will fade all pixels to black.
  background(255);
  
  
}