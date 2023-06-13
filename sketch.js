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
let textToDisplay = [];
let pixelSquare = 20;
const MSG = 'MSG:'
let currentLevelX = 0;
let bob;
let game = false;

//Find whichever dimension the screen is smaller in?
let maximumScreenSize;
let circleSprite;
let inputtedColor;



console.log('constructing classes...');
class Texture {
  constructor(label, x, y, theImage, scale, xLevel){
    this.label = label;
    this.color = 'black';
    this.x = x;
    this.y = y;
    this.image = theImage;
    this.scale = scale;
    this.superXLevel = xLevel;
  }

  display() {
    if(this.superXLevel === currentLevelX){
      image(this.image, this.x, this.y, this.scale, this.scale);
    }
  }
}

class Bob {
  constructor(label, x, frame0, frame1, scale, xLevel){
    this.label = label;
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
      if(this.x > windowWidth - 20){
        this.x = 20;
        this.goalX = this.x;
        this.superXLevel++;
        currentLevelX++;
        for(let i=0; i<texturesToDisplay.length; i++){
          if(texturesToDisplay[i].label === 'grassTexture'){
            texturesToDisplay[i].superXLevel = currentLevelX;
          }
          if(texturesToDisplay[i].label === 'sunTexture'){
            texturesToDisplay[i].x += 50;
          }
        }
        console.log(`INFO Bob.move() ${MSG} lvl${currentLevelX-1} > lvl${currentLevelX}`)
      }
      if(this.goalX < 20 && currentLevelX > 0){
        this.x = windowWidth - 21 - this.scale;
        this.goalX = this.x;
        this.superXLevel--;
        currentLevelX--;
        for(let i=0; i<texturesToDisplay.length; i++){
          if(texturesToDisplay[i].label === 'grassTexture'){
            texturesToDisplay[i].superXLevel = currentLevelX;
          }
          if(texturesToDisplay[i].label === 'sunTexture'){
            texturesToDisplay[i].x -= 50;
          }
        }
        console.log(`INFO Bob.move() ${MSG} lvl${currentLevelX+1} > lvl${currentLevelX}`)
      }
    }
    else{
      this.image = this.imgFrame0;
    }
  }
}

class Mob {
  constructor(label, x, frame0, frame1, scale, xLevel){
    this.label = label;
    this.x = x;
    this.y = (height*2/3);
    this.imgFrame0 = frame0;
    this.imgFrame1 = frame1;
    this.image = frame0;
    this.scale = scale;
    this.goalX = this.x;
    this.goalY = (height*2/3);
    this.superXLevel = xLevel
    this.dialogueYet = 0;
    this.dialogueList = ["this town ain't big enough for the two of us.", "whaddya want?", "go on."]
  }

  display() {
    if(this.superXLevel === currentLevelX){
      image(this.image, this.x, this.y, this.scale, this.scale);
    }
  }

  move() {
    if(this.x !== this.goalX){
      this.image = this.imgFrame1;
      if(this.x - this.goalX > 2){
        this.x -= 3;
      }
      else if(this.x - this.goalX < -2){
        this.x += 3;
      }
      else{
        this.x = this.goalX;
      }
    }
    else{
      this.image = this.imgFrame0;
    }
  }

  idle() {
    if(frameCount % 120 === 0){
      if(this.image === this.imgFrame0){
        this.image = this.imgFrame1;
      }
      else if(this.image === this.imgFrame1){
        this.image = this.imgFrame0;
      }
    }
  }

  dialogue() {
    //add a list to contain the text to display.
    textToDisplay.push(new DisplayText(this.dialogueList[this.dialogueYet], this.x+30, this.y-30))
    this.dialogueYet++;
  }
}

class DisplayText {
  constructor(inputString, locationX, locationY) {
    this.textString = inputString;
    this.x = locationX;
    this.y = locationY;
  }

  display() {
    text(this.textString, this.x, this.y);
  }
}

function preload() {

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
  textSize(32);
  textAlign(CENTER, TOP)

  texturesToDisplay.push(new Texture('sunTexture', 100, 100, loadImage("assets/sun_softer.png"), 100, 0));
  for(let i=0; i<10; i++){
    texturesToDisplay.push(new Texture('grassTexture', i*width/10, height - 150, loadImage("assets/pixil-frame-0.png"), width/10, 0));
  }

  bob = new Bob('bob', 100, loadImage("assets/char-pixil-frame-0.png"), loadImage("assets/char-pixil-frame-1.png"), 100, 0);
  console.log(`loaded: ${bob.label}`)
 
  mobsToDisplay.push(new Mob('cowboy', width*2/3, loadImage("assets/cowboy-pixil-frame-0.png"), loadImage("assets/cowboy-pixil-frame-1.png"), 100, 1));
  console.log(`loaded: ${mobsToDisplay[mobsToDisplay.length-1].label}`)

  console.log('loading maps...');
  // No maps
}

function draw() {
  background(0);
  
  // This statement allows a menu to be put beforehand.
  if(!game){
    fill(255);
    text("press 'e' to start...", width/2, height/2);
  }
  if(game){
    //move
    for(let i=0; i<mobsToDisplay.length; i++){
      mobsToDisplay[i].move();
    }

    bob.move();
  
    //idle
    for(let i=0; i<mobsToDisplay.length; i++){
      mobsToDisplay[i].idle();
    }
    
    //subDraw
    if(texturesToDisplay > 0){
      for(let i=0; i<texturesToDisplay.length; i++){
        textToDisplay[i].display();
      }
    }

    //draw
    for(let i=0; i<texturesToDisplay.length; i++){
      texturesToDisplay[i].display();
    }
    for(let i=0; i<mobsToDisplay.length; i++){
      mobsToDisplay[i].display();
    }
  
    bob.display();
  }
}

function keyPressed(){
  let fnType = 'keyPressed()';

  if(key === 'r'){
    console.log(`INFO ${fnType} ${key} ${mouseX} ${mouseY}`);
    bob.goalX = mouseX;
  }
  else if(key === 'e'){
    console.log(`INFO ${fnType} ${key} ${game}`);
    if(!game){
      game = !game;
      console.log(`INFO gamestart ${game}`);
    }
    if(game){
      // find the nearest mob
      // then display the text for that nearest mob.
      for(let i=0; i<mobsToDisplay.length; i++){
        if(mobsToDisplay[i].x <= bob.x + 30 || mobsToDisplay[i].x > bob.x - 30){
          mobsToDisplay[i].dialogue();
        }
      }
    }
  }
  else{
    console.log(`INFO ${fnType} ${key} ${game}`)
  }
}

function mousePressed(){
  let fnType = 'mousePressed()';
  if(!game){
    console.log(`INFO ${fnType} ${MSG} Please refrain from mouse clickage.`)
  }
  if(game){
    console.log(`INFO ${fnType} ${MSG} Lost by using a mouse. Keyboards will rule the earth.`)
    game = !game;
  }
}