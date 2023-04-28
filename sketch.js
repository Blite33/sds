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

console.log('constructing classes...')
class Pixel {
  constructor(x, y){
    this.color = 'black'
    this.x = x
    this.y = y
  }
}

let circleSprite;

function setup() {
  console.log('setting up...')
  createCanvas(windowWidth, windowHeight);

  circleSprite = new Sprite();
  circleSprite.diameter = 40;

  world.gravity.y = 10

  screenFloor = new Sprite();
  screenFloor.y = height
  screenFloor.w = width
  screenFloor.collider = 'static'

  // We should have a function that fills the entire grid with black pixels. Make a cooler name than 'fillWithBlack()'
  // Note from later: function called 'fillGridBlackPixels()'
}

function draw() {
  // Background might be nice. IDK if that will change much if everything is just grid of pixels.
  // It might be better to have a grid background fill function that's called to change the background.
  // There should also be a fade to black kind of function that will fade all pixels to black.
  background(220);
  if (kb.pressing('left')){
    circleSprite.vel.x = -5;
  }
  else if (kb.pressing('right')){
    circleSprite.vel.x = 5;
  }
  else if (kb.pressing('up')){
    circleSprite.vel.y += 9;
  }
}

function fillGridBlackPixels() {
  for(let y=0; y<pixelSquare; y++){
    grid.push([])
    for(let x=0; x<pixelSquare; x++){
      grid.push(new Pixel(x,y))
    }
  }
}