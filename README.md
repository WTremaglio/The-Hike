<div align = "center">
<img src = "The%20Hike/assets/Queen%20Mary.png"/>

# The Hike</br>Final Project - Adventure Game

<img src = "The%20Hike/assets/The%20Hike.png"/>
</div>

## Project Description
---
*The Hike* is a retro adventure platformer that takes place in a forest. Using a combination of JavaScript and the P5.JS library, *The Hike* will bring life back into the retro video game market. Our message is clear: Simple and retro video games can and are still enjoyable. We hope you enjoy it!

>"One afternoon, Paul Bun set out on a hike through Bear Lakes, Minnesota when he crosses paths with a wild black bear. The bear immediately starts to chase after Paul through the forest. Armed only with bear mace, Paul’s only option is to keep running. Whenever Paul uses the bear mace, the bear is disoriented for a small amount of time. However, when the bear recovers, its speed increases. Paul better move quick if he is to reach the safety of a nearby cabin before the bear catches him."

## How to Play
---

## 1. Setup
When running P5.JS on your local computer, a few extra steps must be taken to ensure the program runs properly. Complete, in-depth instructions for operating a P5.JS program can be found on [P5's Get Started page](https://p5js.org/get-started/) and a guide to setting up a local server on your computer can be found on [P5's GitHub page](https://github.com/processing/p5.js/wiki/Local-server). We found that the easiest process is to follow their guide on "Web Server for Chrome extension" but you are welcome to attempt the guide's other solutions for using a local web server. We have included P5's instructions on using a local web server through Chrome below:

>The simplest and fastest solution for anyone using a Chrome web browser is to install the [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb/) extension. Visit its chrome web store page and install it.
>
>By default, the Web Server won't run in the background, so keep it open for it to work. To launch it on [most devices](https://support.google.com/chrome_webstore/answer/3060053), type `chrome://apps` in the Chrome address bar and press [Enter] to see all your Chrome apps, then click the Web Server icon. On a [Chromebook](https://support.google.com/chromebook/answer/6206362), press the Search key (🔍) or click the Launcher icon (usually at the bottom left corner of the screen) to find and launch the Web Server.
>
>After launching the Web Server a new window will open. There you can click [CHOOSE FOLDER] and select the folder with the HTML page for your sketch. Now you can just click on the Web Server URL (`http://127.0.0.1:8887` by default) to see and open your sketch. If you name your sketch HTML page index.html and enable `Automatically show index.html`, your sketch will load as soon as you open the URL!

***Using a local web server through this method may stop working in the near future. When running the "Web Server for Chrome" extension, it does display a warning message stating that "Web Server for Chrome" is no longer supported. Old versions of Chrome apps won't open on Mac devices after December 2022."***


## 2. Game Instructions
```
-----------------------------------------------
|                                               |
🚧👷🏼‍♂️ **This Section is Under Construction** 👷🏼‍♂️🚧
|                                               |
-----------------------------------------------
```

## Project Documentation
---

## 1. Project Brief

### Part 1: Multimedia Project Design
Produce a design of the multimedia application you plan to implement later. Follow the design procedures and principles, and use the design tools introduced in the lectures. You must choose a type of project from the following scenarios:
- Adventure Game
- Learning Application
- Informative Application
- XML Online Editor

### Part 2: Multimedia Project Presentation and Demo
Implement the multimedia application following your plan using HTML5, Javascript, CSS3, etc. Apply and reflect on the design and perception principles and multimedia theories we have learned in the lectures. Compile the project source and content in a zip package, and prepare a PowerPoint presentation and a demo for the group.

### Part 3: Multimedia Project Report
Write a comprehensive report about the multimedia application you have implemented.

## 2. Scope

### A. Concept
- To make an adventure platform game that takes place in a forest.

### B. Purpose
- Bring life back into the retro video game market, specifically that of platformer games.

### C. Message
- Simple and retro video games can and still are enjoyable to play.

### D. Approach
- Our main focus is on JavaScript to incorporate interactivity in our game. We will be using JavaScript libraries such as P5.JS for this project.

## 3. Motivations

### A. Project Scenario: Adventure Game
- We were motivated to choose an adventure game as our project because we both have attachments to video games.
- Additionally, I want to design and develop video games. Over the past year, I worked for an indie game development studio and taught video game design and development courses over the summer. It was clear that this project scenario fit us better than the others.

### B. Game Style: Retro Platformer
- We chose to go with a platform-style game because, let’s face it, who doesn’t love a classic platform game? The decision to use 8-bit graphics for our game was to further add to the nostalgic/retro feel of a platformer.

## 4. Market Analysis

### A. Target Audience
- With our project being a video game, it allows us to tap into a market of over three billion people. Every other European plays video games. While this is great news at first glance, the term “gamer” includes a broad selection of people. Technically my dad is a gamer because he plays wordle on his iPad. Our true target audience isn’t just gamers, instead, we are focused on three subsets of gamers. We will go deeper into these three markets in a couple of slides for the project concept.

### B. Competition
- The platform game genre is not new to big names. There are a variety of games that have made it big and even become icons of the video game industry in general. These range from Mario such as Super Mario Bros. which is both a platformer and has 2D 8-bit graphics to Ori, a modern platformer that went on to win multiple awards for art.

### C. Unique Selling Point: Tapping into a deserted market
- Our game is set apart from other modern-day platformers by the fact that it taps into the deserted market of pixelated games. The market saw this happen with Flappy Bird. The last pixelated Mario game was released in 1992. The Hike will bring life back into this niche market, as we all know gamers are nostalgic.

## Code Documentation
---

## 1. Menu Screen

<div align = "center">
<img src = "The%20Hike/assets/Title%20Screen.png"/>
</div>

### A. Scene Enum
- To have a working Main Menu, we created an enum named Scene that can store the value of each scene in our game. These scenes include the Main Menu ("menu"), the Help screen ("help"), the Game screen ("game"), and the GameOver screen ("gameover"). By default, the value of `scene` will be set to `menu`.
``` js
// Enum for Scene
const Scene = {
  Menu: Symbol("menu"),
  Help: Symbol("help"),
  Game: Symbol("game"),
  GameOver: Symbol("gameover"),
};
let scene = Scene.Menu;
```

In the draw function, we have a switch case that continuously checks and calls the proper scene:

``` js
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
```

### B. Scrolling Background
- The first thing called in our Menu scene is the scrollingBackground function. This function takes inspiration from chjnmo's guide: "Continuous Scrolling Background Image". The function places two background images side-by-side, the second image is placed to the right of the canvas. The images change their direction, moving to the left until they are fully off-canvas to the left, at which point the image is reset to the right of the canvas. Essentially, this is the programming equivalent of moving a heavy object by rolling logs underneath it: once the back log (first image) fully clears the object (canvas), it is moved to the front (right of canvas).

``` js
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
```

### C. Buttons
- The "buttons" on the Menu screen are rectangles with an event listener. The rectangles are drawn first, followed by the text. To ensure the rectangles are centered around the text properly, the rectangle mode is first set to `CENTER`.

``` js
// Rectangles for buttons
    rectMode(CENTER);
    rect(275, 280, 175, 50);
    rect(525, 280, 175, 50);

    // Text for buttons
    fill("red");
    textSize(25);
    text("Start", 275, 280);
    text("Help", 525, 280);
```
- The mouseClicked function is an event listener for a mouse click. When this function is activated, an if-conditional checks whether the scene is set to Menu. If the scene is set to Menu, the nested conditionals check to see if the mouse is located within the boundaries of the button rectangles. If the mouse is within the boundaries, the scene is changed to the respective screen.
``` js
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
```

## 2. Help Screen
```
-----------------------------------------------
|                                               |
🚧👷🏼‍♂️ **This Section is Under Construction** 👷🏼‍♂️🚧
|                                               |
-----------------------------------------------
```

## 3. Game Screen
```
-----------------------------------------------
|                                               |
🚧👷🏼‍♂️ **This Section is Under Construction** 👷🏼‍♂️🚧
|                                               |
-----------------------------------------------
```

### A. Game Mechanics
```
-----------------------------------------------
|                                               |
🚧👷🏼‍♂️ **This Section is Under Construction** 👷🏼‍♂️🚧
|                                               |
-----------------------------------------------
```

### B. Enemy Mechanics
```
-----------------------------------------------
|                                               |
🚧👷🏼‍♂️ **This Section is Under Construction** 👷🏼‍♂️🚧
|                                               |
-----------------------------------------------
```

### C. Projectile Mechanics
```
-----------------------------------------------
|                                               |
🚧👷🏼‍♂️ **This Section is Under Construction** 👷🏼‍♂️🚧
|                                               |
-----------------------------------------------
```

## 4. GameOver Screen
```
-----------------------------------------------
|                                               |
🚧👷🏼‍♂️ **This Section is Under Construction** 👷🏼‍♂️🚧
|                                               |
-----------------------------------------------
```

### A. Win Condition
```
-----------------------------------------------
|                                               |
🚧👷🏼‍♂️ **This Section is Under Construction** 👷🏼‍♂️🚧
|                                               |
-----------------------------------------------
```

### B. Lose Condition
```
-----------------------------------------------
|                                               |
🚧👷🏼‍♂️ **This Section is Under Construction** 👷🏼‍♂️🚧
|                                               |
-----------------------------------------------
```

## Known Bugs
---
## Contributors
---
- [William Tremaglio](https://github.com/WTremaglio), Creative Computing
- Kamryn Dudwal, Creative Computing
