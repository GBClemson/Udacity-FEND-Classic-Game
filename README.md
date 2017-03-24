> frontend-nanodegree-arcade-game
> ===============================

> Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions > you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as
> Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer
> to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to
> 1. Run and 2. Play your arcade game.

> For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

# Greg Bopp - Frogger Style Game
#### Front-End Web Developer Nanodegree - 2017.03.23

## Installation
To successfully run this game you must have the following files locally on your computer all stored in the same folder:
- index.html
- folder named 'css' that contains:
  - style.css
- folder named 'js' that contains:
  - resources.js
  - app.js
  - engine.js
- folder named 'images' that contains:
  - 'stone-block.png'
  - 'water-block.png'
  - 'grass-block.png'
  - 'enemy-bug.png'
  - 'char-boy.png'
  - 'char-boy-dead.png'
  - 'modal-easy.jpg'
  - 'modal-medium.jpg'
  - 'modal-hard.jpg'

## Starting the game
Once you have all of the required files, you can play the game by simply launching `index.html` in your favorite browser.

## Bugs / Issues
The game has been developed for use only with a keyboard and does not currently support tablets, phones and other touch only devices. You must have a keyboard to be able to play the game. Support for touchscreen devices will be looked into for a future release.

## Playing the game
Once you see the game on your browser screen you are greeted with a modal window that asks you which difficulty you would like to try. Feel free to try any of the difficulties by clicking on one with your mouse. Easy is extra easy so you can get a feel for the controls. Once you select a difficulty you will be greeted with a countdown timer before the modal window dissappears and you are free to play. This is put in place to give the enemies a chance to be created and get a head start before you go running up the screen to the water with little to no resistance. Speaking of controls and running up to the water...

#### Objective of the game
Your mission in this game should you choose to accept it is very similar to the old classic 'Frogger' game. If you are familiar with that then you should be golden here. Quick jist of the game is to **move your player** avatar that starts near the bottom of the game board all the way **up to** the top where **the water** is. To make this journey a bit more difficult, **you must avoid** the **bugs** at all costs that are moving across the screen from left to right. These bugs are only going to travel along the stone 'bug lanes'. If you are on the grass you are safe. If a bug hits you... You die and lose a life (You start out with 3 lives). If you lose your last life then you are done for and you can not continue playing... **GAME OVER!!**. However, if you manage to move around the bugs and get to the water... **YOU WIN!!** You can continue to play for however long you would like. Your score will keep ruising with each win and as you move around in the bug lanes.

#### Controls
The controls for the game are very simple. You can only use the arrow keys. Either the dedicated arrow keys or the numpad arrow keys will work. If you need to pause the game you can hit the 'P' key. If you do pause the game and then are ready to play again, just press the 'P' key again. You will have a 1 second delay before the bugs start moving again. During that 1 second delay you cannot move either. If you attempt to hit any key other than the arrows or 'P' then the game will be paused and you will greeted with a popup that warns you that you pressed an invalid key.

#### Navigating the board
Some things to think about while navigating the game board. The player avatar moves in different increments depending on the direction you are moving. If you move up or down, the player will move one full square in that direction. However to be a little safer / more precise when on the bug lanes you will only move one half of a square to the left or right.

#### Winning the game
There is no way to "beat" the game. Your score goes up each time you move while on the bug lanes and if you get to the water. There are even a couple of secret achievements that you can unlock by doing certain things while playing.

#### Game End
There are multiple opportunities for you as the player to quit playing. Each time you die you are asked if you want to continue. Each time you win you are asked if you would like to continue. And of course once you are out of lives, you cannot continue. IF at any of these points you either decide not to play anymore or you cannot play anymore... The game does not currently have a full reset option that brings you, the user back to the difficulty selection screen. Instead you are prompted at these points to refresh your browser window to play again.