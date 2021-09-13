var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount;
var database, gameState;
var form, player, playerCount;
var allPlayers, car1, car2, cars,carImage1,carImage2,TheEntireMap;
var fuelimg,powerimg,obstacleimg
var fuelGroup,powerGroup,obstacleGroup
function preload() {
  backgroundImage = loadImage("./assets/background.png");
  carImage1 = loadImage("./assets/car1.png")
  carImage2 = loadImage("./assets/car2.png")
  TheEntireMap = loadImage("./assets/track.jpg")
  fuelimg = loadImage("./assets/fuel.png")
  powerimg = loadImage("./assets/goldCoin.png")
  obstacleimg = loadImage("./assets/obstacle1.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database()
  game = new Game();
  game.start();
  game.getState();
}

function draw() {
  background(backgroundImage);
  if (playerCount === 2) {
    game.updateState(1);
  }

  if (gameState === 1) {
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
