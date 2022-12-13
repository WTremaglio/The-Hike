// Enum for Scene
const Scene = {
  Menu: Symbol("menu"),
  Help: Symbol("help"),
  Game: Symbol("game"),
  GameOver: Symbol("gameover"),
};
let scene = Scene.Menu;

// Enum for Level
const Level = {
  Tutorial: Symbol("tutorial"),
  One: Symbol("one"),
};
level = Level.Tutorial;

// Variables for Scrolling Background
let x1 = 0;
let scrollSpeed = 1;

// Initializing jumpCounter
jumpCounter = 0;

// Initializing Game Outcome
win = false;

function preload() {
  // Loading assets for Menu
  bg = loadImage("assets/backgrounds/background.jpg"); // Loading background image
  pressStart = loadFont("assets/other/PressStart2P-Regular.ttf"); // Loading font style

  // Loading images for Game
  grass_bg = loadImage("assets/backgrounds/grass_bg.png");
  cliff_bg = loadImage("assets/backgrounds/cliff_bg.png");

  // Loading animations for Game
  idleAni = loadAnimation("assets/player/player1.png");
  runningAni = loadAnimation(
    "assets/player/player1.png",
    "assets/player/player2.png",
    "assets/player/player3.png",
    "assets/player/player4.png",
    "assets/player/player5.png",
    "assets/player/player6.png",
    "assets/player/player7.png",
    "assets/player/player8.png"
  );
  pickaxeAni = loadAnimation("assets/other/pickaxe.png");
  woodenSignAni = loadAnimation("assets/other/sign.png");
  logAni = loadAnimation("assets/other/fallen_log.png");
  mdTreeAni = loadAnimation("assets/trees/medium_tree.png");
  lgTreeAni = loadAnimation("assets/trees/large_tree.png");
  smBoulderAni = loadAnimation("assets/boulders/small_boulder.png");
  lgBoulderAni = loadAnimation("assets/boulders/large_boulder.png");
  leftCliffAni = loadAnimation("assets/cliffs/left_cliff.png");
  rightCliffAni = loadAnimation("assets/cliffs/right_cliff.png");
  mdCliffAni = loadAnimation("assets/cliffs/medium_cliff.png");
  lgCliffAni = loadAnimation("assets/cliffs/large_cliff.png");
  cabinAni = loadAnimation(
    "assets/cabin/cabin1.png",
    "assets/cabin/cabin2.png",
    "assets/cabin/cabin3.png"
  );
  bearAni = loadAnimation(
    "assets/bear/bear1.png",
    "assets/bear/bear2.png",
    "assets/bear/bear3.png"
  );
  bearAni.frameDelay = 10;
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
    text("The Hike", width / 2, 125);

    // Displaying contributors
    fill("#49B7FA");
    stroke("white");
    textSize(15);
    text("Created by: William Tremaglio", width / 2, 425);
    text("& Kamryn Dudwal", width / 2, 450);

    // Resetting the styling
    fill("#EBEDD5");
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
  displayText();

  /*
   * Displays text and buttons for the help screen
   */
  function displayText() {
    background(0);

    // Setting the styling
    fill(255);
    strokeWeight(0);

    // Displaying title
    textSize(50);
    text("How to Play", width / 2, 100);

    // Instructions
    textSize(15);
    text("Paul Bun is being chased through the forest by a", width / 2, 180);
    text("wild bear! Help Paul return to his log cabin before", width / 2, 200);
    text("the bear catches up to him! Make sure to avoid", width / 2, 220);
    text("obstacles such as falling rocks along the way.", width / 2, 240);
    text("Use the arrow or WASD keys to guide Paul back to", width / 2, 280);
    text("the cabin. Press the Spacebar to throw a pickaxe at", width / 2, 300);
    text("large boulders to destroy them.", width / 2, 320);

    // Rectangle for button
    rect(width - 100, height - 50, 175, 50);

    // Text for button
    fill(0);
    textSize(25);
    text("Back", width - 100, height - 50);
  }
}

/*
 * Game Screen Code
 */
function game() {
  // Clearing previous canvas and setting new canvas
  clear();
  background("#5bb2cd");
  camera.on();

  // Player Jump - jumpCounter prevents double jump
  if (kb.presses("up") && jumpCounter < 2) {
    player.velocity.y = -12;
    jumpCounter++;
  }

  if (jumpCounter > 1) {
    jumpCounter++;

    if (jumpCounter == 60) {
      jumpCounter = 0;
    }
  }

  // Player movement
  if (kb.pressing("left")) {
    player.velocity.x = -5;
    player.mirror.x = true;
    player.changeAnimation("running");
  } else if (kb.pressing("right")) {
    player.velocity.x = 5;
    player.mirror.x = false;
    player.changeAnimation("running");
  } else {
    player.velocity.x = 0;
    player.changeAnimation("idle");
  }

  // When Spacebar is pressed, spawn Pickaxe projectile
  if (kb.presses(" ")) {
    axe = new pickaxe.Sprite();

    // Pickaxe moves in the direction the player is facing
    if (player.mirror.x) {
      axe.pos = { x: player.x - 50, y: player.y - 10 };
      axe.velocity.x = -7.5;
    } else {
      axe.pos = { x: player.x + 50, y: player.y - 10 };
      axe.velocity.x = 7.5;
    }
  }

  // Checking for Pickaxe collision
  if (pickaxe.length > 0) {
    for (let i = 0; i < pickaxe.length; i++) {
      pickaxe[i].velocity.y = -0.25;

      if (pickaxe[i].collides(largeBoulder)) {
        pickaxe[i].remove();
        largeBoulder.remove();
        break;
      } else if (
        pickaxe[i].collides(allSprites) &&
        !pickaxe[i].collides(player)
      ) {
        pickaxe[i].remove();
      }
    }
  }

  // Rocks drop from above
  if (level == Level.One) {
    if (player.x > 2893.5) {
      smRock2.velocity.y = 12.5;
    }
    if (player.x > 3227.5) {
      smRock3.velocity.y = 12.5;
    }

    // If rock drop hits player: game over
    if (player.collides(smRock2) || player.collides(smRock3)) {
      scene = Scene.GameOver;
      allSprites.remove();
      clear();
    }
  }

  // GameOver if Bear catches Player
  if (player.overlaps(enemy)) {
    switchToGameOver();
    allSprites.remove();
    clear();
  }

  // Switch to Level One after Tutorial completion
  if (player.overlaps(cabin)) {
    switch (level) {
      case Level.Tutorial:
        level = Level.One;
        allSprites.remove();
        setupSprites();
        break;
      case Level.One:
        switchToGameOver();
        allSprites.remove();
        win = true;
        clear();
        break;
    }
  }

  // Grass and Camera follow Player
  grass.x = player.x;
  camera.x = player.x;
  camera.y = player.y;
  camera.off();
}

/*
 * GameOver Screen Code
 */
function gameOver() {
  scrollingBackground();
  displayText(win);

  /*
   * Displays text and buttons for the GameOver screen
   */
  function displayText(win) {
    // Setting the styling
    fill("yellow");
    strokeWeight(5);

    // Displaying title
    textSize(50);
    text("Game Over", width / 2, 100);

    // Displaying game outcome
    fill("red");
    stroke(255);
    textSize(15);
    if (win) {
      // Displaying win screen
      text("Congragulations! You beat the game!", width / 2, 175);
    } else {
      // Displaying lose screen
      text("Paul Bunn died. You lose.", width / 2, 175);
    }
    text("Play again?", width / 2, 225);

    // Resetting the styling
    fill("#ebedd5");
    stroke(0);
    strokeWeight(2.5);

    // Rectangles for buttons
    rect(275, 300, 200, 50);
    rect(525, 300, 200, 50);

    // Text for buttons
    fill("red");
    textSize(25);
    text("Menu", 275, 300);
    text("Restart", 525, 300);
  }
}

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
  } else if (x2 < -width) {
    x2 = width;
  }
}

/*
 * Setting Up Sprite Groups
 */
function setupSpriteGroups() {
  // Setting up Enemy group
  enemy = new Group();
  enemy.addAnimation("bear", bearAni);
  enemy.collider = "kinematic";

  // Setting up Pickaxe group
  pickaxe = new Group();
  pickaxe.addAnimation("axe", pickaxeAni);
  pickaxe.w = 25;
  pickaxe.l = 25;
  pickaxe.collider = "dynamic";
  pickaxe.rotationSpeed = 10;

  // Setting up Sign group
  woodenSign = new Group();
  woodenSign.addAnimation("sign", woodenSignAni);
  woodenSign.collider = "none";

  // Setting up Log group
  logs = new Group();
  logs.addAnimation("log", logAni);
  logs.collider = "static";

  // Setting up Tree group
  tree = new Group();
  tree.w = 50;
  tree.collider = "static";

  // Setting up Tree sub group: Medium Tree
  mediumTree = new tree.Group();
  mediumTree.addAnimation("mdTree", mdTreeAni);
  mediumTree.h = 200;

  // Setting up Tree sub group: Large Tree
  largeTree = new tree.Group();
  largeTree.addAnimation("lgTree", lgTreeAni);
  largeTree.h = 420;

  // Setting up Boulder group
  boulder = new Group();

  // Setting up Boulder sub group: Small Boulder
  smallBoulder = new boulder.Group();
  smallBoulder.addAnimation("smBoulder", smBoulderAni);
  smallBoulder.collider = "kinematic";

  // Setting up Boulder sub group: Large Boulder
  largeBoulder = new boulder.Group();
  largeBoulder.addAnimation("lgBoulder", lgBoulderAni);
  largeBoulder.collider = "static";

  // Setting up the Platform group
  platform = new Group();
  platform.collider = "static";

  // Setting up Platform sub group: Left Cliff
  leftCliff = new platform.Group();
  leftCliff.addAnimation("leftCliff", leftCliffAni);

  // Setting up Platform sub group: Right Cliff
  rightCliff = new platform.Group();
  rightCliff.addAnimation("rightCliff", rightCliffAni);

  // Setting up Platform sub group: Medium Cliff
  mediumCliff = new platform.Group();
  mediumCliff.addAnimation("mdCliff", mdCliffAni);

  // Setting up Platform sub group: Large Cliff
  largeCliff = new platform.Group();
  largeCliff.addAnimation("lgCliff", lgCliffAni);

  // Setting up Log Cabin group
  logCabin = new Group();
  logCabin.addAnimation("cabin", cabinAni);
  logCabin.w = 300;
  logCabin.h = 440;
  logCabin.collider = "static";
}

/*
 * Setting Up Sprites
 */
function setupSprites() {
  // Setup sprite groups
  setupSpriteGroups();

  // Create grass background
  grass = new Sprite(grass_bg, 0, height - 310, "none");

  sign = new woodenSign.Sprite(312.5, height - 140);

  // Creating the boundaries
  switch (level) {
    case Level.Tutorial:
      // Create barrier
      boundary = new Sprite(
        1187,
        -300,
        [
          [2925, 0],
          [0, 1400],
          [-2925, 0],
          [0, -1400],
        ],
        "static"
      );
      boundary.shape = "chain";

      // Create signs
      sign = new woodenSign.Sprite(1092.5, height - 140);
      sign = new woodenSign.Sprite(1910.5, height - 140);

      // Create obstacles
      lgTree = new largeTree.Sprite(-300, height - 310);
      fallen_log = new logs.Sprite(702.5, height - 135);
      rock1 = new largeBoulder.Sprite(1501.5, height - 250);

      // Create cabin
      cabin = new logCabin.Sprite(2600, height - 320);
      break;

    case Level.One:
      // Create cliffside background
      cliffside = new Sprite(cliff_bg, 3135.5, -width, "none");

      // Creating the boundaries
      boundary = new Sprite(
        1680.5,
        -width,
        [
          [3910.5, 0],
          [0, 2400],
          [-3910.5, 0],
          [0, -2400],
        ],
        "static"
      );
      boundary.shape = "chain";

      // Create signs
      sign = new woodenSign.Sprite(1130.5, height - 140);
      sign = new woodenSign.Sprite(1910.5, height - 140);
      sign = new woodenSign.Sprite(2635.5, height - 140);

      // Create obstacles
      lgTree = new largeTree.Sprite(-300, height - 310);
      lgRock1 = new largeBoulder.Sprite(721.5, height - 250);
      fallen_log = new logs.Sprite(1520.5, height - 135);
      smRock1 = new smallBoulder.Sprite(2273, height - 130);
      smRock2 = new smallBoulder.Sprite(2968.5, -309);
      smRock3 = new smallBoulder.Sprite(3302.5, -309);

      // Create platforms
      plat1 = new leftCliff.Sprite(3593, 150);
      plat2 = new mediumCliff.Sprite(3135.5, 0);
      plat3 = new rightCliff.Sprite(2678, -150);
      plat4 = new mediumCliff.Sprite(2968.5, -400);
      plat5 = new mediumCliff.Sprite(3302.5, -400);
      plat6 = new leftCliff.Sprite(3593, -550);
      plat7 = new mediumCliff.Sprite(3135.5, -700);
      plat8 = new rightCliff.Sprite(2678, -950);
      plat9 = new largeCliff.Sprite(3135.5, -1200);

      // Create bear
      bear = new enemy.Sprite(-500, height - 160);
      bear.velocity.x = 4;

      // Create cabin
      cabin = new logCabin.Sprite(3135.5, -1490);
      break;
  }

  boundary.visible = false; // Setting boundaries to invisible
  setupPlayer(0, height - 150); // Setting up player
}

/*
 * Setting Up Player Sprite
 */
function setupPlayer(x, y) {
  player = new Sprite(x, y, 50, 100);
  player.rotationLock = true; // Locking sprite rotation
  player.friction = 0; // Turning off sprite friction

  player.addAnimation("idle", idleAni); // Player idle animation
  player.addAnimation("running", runningAni); // Player running animation
}

/*
 * Event Listener for Mouse Clicked
 */
function mouseClicked() {
  // Event Listener for clicking buttons
  switch (scene) {
    case Scene.Menu:
      // Code for Menu buttons
      if (mouseY >= 255 && mouseY <= 305) {
        if (mouseX >= 187.5 && mouseX <= 362.5) {
          switchToGame();
        } else if (mouseX >= 437.5 && mouseX <= 612.5) {
          switchToHelp();
        }
      }
      break;
    case Scene.Help:
      // Code for Help button
      if (mouseY >= 425 && mouseY <= 475) {
        if (mouseX >= 612.5 && mouseX <= 787.5) {
          switchToMenu();
        }
      }
      break;
    case Scene.GameOver:
      // Code for GameOver buttons
      if (mouseY >= 275 && mouseY <= 325) {
        if (mouseX >= 187.5 && mouseX <= 362.5) {
          switchToMenu();
        } else if (mouseX >= 437.5 && mouseX <= 612.5) {
          switchToGame();
        }
      }
      break;
  }
}

/*
 * Switching to Menu
 */
function switchToMenu() {
  scene = Scene.Menu;
}

/*
 * Switching to Help
 */
function switchToHelp() {
  scene = Scene.Help;
}

/*
 * Switching to Game
 */
function switchToGame() {
  scene = Scene.Game;
  world.gravity.y = 25;
  setupSprites();
}

/*
 * Switching to GameOver
 */
function switchToGameOver() {
  scene = Scene.GameOver;
  level = Level.Tutorial;
}
