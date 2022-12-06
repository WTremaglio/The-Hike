// Enum for Scene
const Scene = {
  Menu: Symbol("menu"),
  Help: Symbol("help"),
  Game: Symbol("game"),
  GameOver: Symbol("gameover"),
};
let scene = Scene.Menu;

// Variables for Scrolling Background
var bg;
var x1 = 0;
var x2;
var scrollSpeed = 1;

// Custom font style
var pressStart;

function preload() {
  bg = loadImage("assets/background.jpg"); // Loading background image
  pressStart = loadFont("assets/PressStart2P-Regular.ttf"); // Loading font style
}

function setup() {
  // Creating new canvas
  createCanvas(800, 500);
  x2 = width;
}

function draw() {
  // Scene switch case
  switch (scene) {
    case Scene.Menu:
      // Code for Menu screen
      menu();
      break;
    case Scene.Help:
      // Code for Help screen
      help();
      break;
    case Scene.Game:
      // Code for Game screen
      game();
      break;
    case Scene.GameOver:
      // Code for GameOver screen
      gameOver();
      break;
  }
}

/*
 * Menu Screen Code
*/
function menu() {
  scrollingBackground();
  displayText();

  /*
   * Creates "scrolling" effect with background image
   * Inspiration from "Continuous Scrolling Background Image by chjno"
  */
  function scrollingBackground() {
    image(bg, x1, 0, width, height); // First image
    image(bg, x2, 0, width, height); // Second image

    // Moving the images horizontally
    x1 -= scrollSpeed;
    x2 -= scrollSpeed;

    // Reseting the images
    if (x1 < -width) {
      x1 = width;
    }
    else if (x2 < -width) {
      x2 = width;
    }
  }

  /*
   * Displays text and buttons for the menu
  */
  function displayText() {
    // Setting the styling
    fill("yellow");
    stroke(0);
    strokeWeight(5);

    // Displaying title
    textSize(100);
    textAlign(CENTER, CENTER);
    textFont(pressStart);
    text("The Hike", 400, 125);

    // Displaying contributors
    fill("#49B7FA");
    stroke("white");
    textSize(15);
    text("Created by: William Tremaglio", 400, 425);
    text("& Kamryn Dudwal", 400, 450);

    // Resetting the styling
    fill("#ebedd5");
    stroke(0);
    strokeWeight(2.5);

    // Rectangles for buttons
    rectMode(CENTER);
    rect(275, 280, 175, 50);
    rect(525, 280, 175, 50);

    // Text for buttons
    fill("red");
    textSize(25);
    text("Start", 275, 280);
    text("Help", 525, 280);
  }
}

/*
 * Help Screen Code
*/
function help() {
  /* Default Code to Indicate Successful Screen Change */
  clear();
  fill(255);
  strokeWeight(5);
  textSize(50);
  text("Help Screen", 400, 250);
}

/*
 * Game Screen Code
*/
function game() {
  /* Default Code to Indicate Successful Screen Change */
  clear();
  fill(255);
  strokeWeight(5);
  textSize(50);
  text("Game Screen", 400, 250);
}

/*
 * GameOver Screen Code
*/
function gameOver() { }

/*
 * Event Listener for Mouse Clicked
*/
function mouseClicked() {
  // Event Listener for clicking buttons on Menu
  if (scene === Scene.Menu) {
    if (mouseY >= 255 && mouseY <= 305) {
      if (mouseX >= 437.5 && mouseX <= 612.5) {
        scene = Scene.Help;
      } else if (mouseX >= 187.5 && mouseX <= 362.5) {
        scene = Scene.Game;
      }
    }
  }
}