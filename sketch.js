// 2D Game
// William Harris
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

console.log('instantiating globals...');
// instantiate grid globally...
let grid = [];
let pixelSquare = 50;

//Find whichever dimension the screen is smaller in?
let maximumScreenSize;
let circleSprite;

console.log('loading assets...');
grassTexture = loadJSON('assets/grassTexture.json')

console.log('constructing classes...');
class Pixel {
  constructor(x, y){
    this.color = 'black'
    this.x = x
    this.y = y
  }

  display() {
    stroke(this.color);
    strokeWeight(1);
    fill(this.color);
    rect(this.x, this.y, (maximumScreenSize/pixelSquare));
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

function mapObjectsToPixelGrid() {
  // Have all the objects in a list to be displayed.
  // Make a priority system...
  // - Background z0
  // - Ground z1
  // - Unused z2
  // - Player/Objects z3
  // - Closer Objects z4

  // We need a solution for textures.
  // It might be better to create a texture maker by hand if it's going to be that hard.
  // Make sure you store everything in hex...
}

function loadTextures() {
  // Find a way to save the color of the pixels to a file!
  // How can I save objects to a file? Find a way to save the current output of the grid.
  // - Use stringify...
  // How can I get objects back from the file?
}