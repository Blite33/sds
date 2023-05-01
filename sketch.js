// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

/*
What I'll need to make a 2D world function:
- 2D array/grid
- - This will need either a 3D array so we have different properties, or each pixel is an object.
*/

console.log('instantiating globals...')
// instantiate grid globally...
let grid = [];
let pixelSquare = 50

//Find whichever dimension the screen is smaller in?
let maximumScreenSize;

console.log('constructing classes...')
class Pixel {
  constructor(x, y){
    this.color = 'black'
    this.x = x
    this.y = y
  }

  display() {
    stroke(this.color);
    strokeWeight(1)
    fill(this.color);
    rect(this.x, this.y, (maximumScreenSize/pixelSquare));
  }
}

let circleSprite;

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

  // We should have a function that fills the entire grid with black pixels. Make a cooler name than 'fillWithBlack()'
  // Note from later: function called 'fillGridBlackPixels()'
  fillGridBlackPixels()
}

function draw() {
  // Background might be nice. IDK if that will change much if everything is just grid of pixels.
  // It might be better to have a grid background fill function that's called to change the background.
  // There should also be a fade to black kind of function that will fade all pixels to black.
  background(255);
  for(let y=0; y<pixelSquare; y++){
    for(let x=0; x<pixelSquare; x++){
      grid[y][x].display()
    }
  }
  
}

function fillGridBlackPixels() {
  for(let y=0; y<pixelSquare; y++){
    grid.push([])
    for(let x=0; x<pixelSquare; x++){
      grid[y].push(new Pixel(round(x*(maximumScreenSize/pixelSquare), 2), round(y*(maximumScreenSize/pixelSquare), 2)))
    }
  }
  console.log(grid);
}