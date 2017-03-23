

// numOfEnemies established to select a difficulty before starting the game.
var numOfEnemies;
// score is a running tabulation of the players score
var score = 0;
// player lives left that are displayed on the game screen at all times
var lives = 3;
/* playerFrozen tracks the state of the player avatar. If it is moving around
 * it is false, if the player gets to the water it will change to true
 * If the player is dead or out of lives it will change to true.
 * This will allow us to unpause the game only when playerFrozen is false.
 */
var playerFrozen = false;

/* dangerZone is a counter that increases each time the player moves in a bug lane.
 * it triggers an acheivement after a predetermined number of moves.
 */
var dangerZone = 0;
/* gamePaused will be checked for with each game frame.
/* If it ever switches to true then the enemies and player cannot move.
 */
var gamePaused = false;

/* clearScore and clearLives covers up the current score or number of lives with white text
 * so that it cannot be seen under the new updated score.
 * It must be run anytime the score or lives are updated and it must
 * be run before the score gets updated.
 */
function clearScore() {
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.fillText("Score: "+score, 10, 40);
    ctx.strokeText("Score: "+score, 10, 40);
    dangerZone++;
}

function clearLives() {
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.fillText("Lives: "+lives, 415, 40);
    ctx.strokeText("Lives: "+lives, 415, 40);
    dangerZone = 0;
}
/* Thank you to stack overflow for showing me a very simple way to cover up the score before updating it:
 * http://stackoverflow.com/questions/3543687/how-do-i-clear-text-from-the-canvas-element
 */

//Enemy Coordinate limits:
var minX = 0;
var maxX = 505;

//laneCoords forces the enemy-bug to have a y coordinate that puts it in the middle of one of the 3 stone lanes on the screen.
var laneCoords = [61, 144, 227];

/* checkCollisions being called from engine.js. Established collision points based on the dimensions of
 * enemy and player sprites
 */
function checkCollisions() {
    allEnemies.forEach(function(enemy) {
        /* The left, right, top, bottom coordinates establish an invisible box around the enemy and
         * player sprites that are used to detect collision properly. If an enemy box crosses a player
         * box then we have a collision and the player loses one life.
         */
        var enemyLeft = enemy.x + 2;
        var enemyRight = enemy.x + 96;
        var enemyTop = enemy.y + 80;
        var enemyBottom = enemy.y + 140;

        var playerLeft = player.x + 18;
        var playerRight = player.x + 84;
        var playerTop = player.y + 64;
        var playerBottom = player.y + 139;

        if (enemyRight > playerLeft && enemyLeft < playerRight && enemyBottom > playerTop && enemyTop < playerBottom) {
            function youDied() {
                gamePaused = true;
                playerFrozen = true;
                clearLives();
                lives--;
                console.log("You died and now have "+lives+" lives left");
                // deadConfirm is here to give the player a chance to quit playing after a death.
                function deadConfirm() {
                     if (confirm("YOU DIED!! Press OK to continue playing,\n or Press CANCEL to quit.") == true) {
                        player.sprite = 'images/char-boy.png';
                        player.x = 202;
                        player.y = 403;
                        gamePaused = false;
                        playerFrozen = false;
                    }else{
                        alert("THANKS FOR PLAYING MY AWESOMELY ADVANCED GAME!!\n "+
                            "Refresh your screen to try a different difficulty!\n "+
                            "(Press ctrl+R or hit the refresh button at the top of the browser)");
                    }
                }
                if (lives > 0) {
                    deadConfirm();
                }if (lives === 0) {
                    alert("OOOOH, too bad. You have no lives left! GAME OVER\n "+
                        "Refresh your screen to try a different difficulty!\n "+
                        "(Press ctrl+R or hit the refresh button at the top of the browser)");
                }
            }
            player.sprite = 'images/char-boy-dead.png';
            /* we call the youDied function 5ms after the collision so that the player sprite will
             * move and show up on the screen in the correct position before the function is called.
             */
            setTimeout(function(){ youDied(); }, 5);
        }
    });
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //the "- (maxX + 101)" at the end is to ensure that all enemies are generated off screen as 'enemy-bug.png' is 101 pixels wide.
    this.x = (Math.floor(Math.random() * maxX) - (maxX + 101));
    //startingLane will randomly access one of the lanes (set globally) for the enemy-bug's starting y position.
    var startingLane = laneCoords[Math.floor(Math.random() * laneCoords.length)];
    this.y = startingLane;
        //console.log("An enemy has been created and the coordinates are: x= "+this.x+" and y= "+this.y);
    var speedMin = (numOfEnemies*5);
    var speedMax = (numOfEnemies*25);
    this.speed = (Math.floor(Math.random() * (speedMax - speedMin)) + speedMin);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x =+ (this.x+(this.speed*dt));


    // This function runs the Enemy function once the bug has left the
    // right side of the screen. This will then be given new
    // random starting coordinates and speed.
    if (this.x >= 505) {
        Enemy.call(this);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 403;
};

Player.prototype.update = function(dt) {
    // dangerZone is triggered when a player has 20 moves in the bug lanes without winning or dying.
    // It awards bonus points.
    if (dangerZone === 20) {
        gamePaused = true;
        clearScore();
        score = score + 1000;
        //livingDangerously is in a nested function so that it can be delayed and called once the player moves this frame.
        function livingDangerously() {
            playerFrozen = true;
            // used a confirm box vs an alert box so that we can make the enemies stop moving while
            // this box is open and then resume 1 second (1000ms) after the player exits the popup.
            if (confirm("CONGRATULATIONS!! You've been living dangerously!\n(20 moves in bug lanes without winning or dying)\n 1000 points!") == true) {
                setTimeout(function(){ gamePaused = false; }, 1000);
                playerFrozen = false;
            } else {
                setTimeout(function(){ gamePaused = false }, 1000);
                playerFrozen = false;
            }
        };

        // livingDangerously function is being called after a 5 ms delay so that the player sprite
        // position will move to the next space that awarded the acheivement before the confirm window
        // pops up.
        setTimeout(function(){ livingDangerously(); }, 5);

    }
    if (dangerZone === 50) {
        gamePaused = true;
        clearScore();
        score = score + 5000;
        function fearless() {
            playerFrozen = true;
            if (confirm("CONGRATULATIONS!! You are fearless!\n(50 moves in bug lanes without winning or dying)\n5000 points!") == true) {
                // One second delay after exiting the alert window before enemies start moving again.
                setTimeout(function(){ gamePaused = false; }, 1000);
                playerFrozen = false;
            } else {
                setTimeout(function(){ gamePaused = false; }, 1000);
                playerFrozen = false;
            }
        };
        // fearless function is being called after a 5 ms delay so that the player sprite
        // position can move to the space that awarded the acheivement before the confirm window
        // pops up.
        setTimeout(function(){ fearless(); }, 5);
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input) {
    if (gamePaused === false) {
        if(input == 'left' && this.x > 0) {
            this.x -= 50.5;
            if (this.y <= 237 && this.y >= 71) {
                clearScore();
                score = score + 10;
            }
        }
        if(input == 'right' && this.x < 404) {
            this.x += 50.5;
            if (this.y <= 237 && this.y >= 71) {
                clearScore();
                score = score + 10;
            }
        }
        if(input == 'down' && this.y < 383) {
            this.y += 83;
            if (this.x <= 404 && this.x >= 0 && this.y <= 237 && this.y >= 71) {
                clearScore();
                score = score + 10;
            }
        }
        if(input == 'up' && this.y > -12) {
            this.y -= 83;
            if (this.x <= 404 && this.x >= 0 && this.y <= 237 && this.y >= 71) {
                clearScore();
                score = score + 10;
            }
        }
        if (this.y === -12){
            function youWon() {
                gamePaused = true;
                playerFrozen = true;
                dangerZone = 0;
                if (confirm("YOU WON!! Press OK to continue playing,\n or Press CANCEL to quit") == true) {
                    player.x = 202;
                    player.y = 403;
                    setTimeout(function(){ gamePaused = false; }, 1000);
                    playerFrozen = false;
                } else {
                    dangerZone = 0;
                    alert("THANKS FOR PLAYING MY AWESOMELY ADVANCED GAME!!\n "+
                            "Refresh your screen to try a different difficulty!\n "+
                            "(Press ctrl+R or hit the refresh button at the top of the browser)");
                }

            }
            clearScore();
            score = score + 100;
            setTimeout(function(){ youWon(); }, 300);
        }
        if(input != "left" && input != "right" && input != "down" && input != "up" && input != "p") {
            gamePaused = true;
            playerFrozen = true;
            // I want the game to be paused while an alert window is open so I chose to use the confirm window.
            // It is a bit redundant with both buttons doing the same thing but it is the only way I know to
            // trigger the paused state while the window is open.
            if (confirm("You can only use the arrow keys or the arrows on the numpad to move around the board:\n press OK or CANCEL to continue") == true) {
                // One second delay after exiting the alert window before enemies start moving again.
                setTimeout(function(){ gamePaused = false; }, 1000);
                playerFrozen = false;
            }else{
                setTimeout(function(){ gamePaused = false; }, 1000);
                playerFrozen = false;
            }
        }
    }
    if (input == 'p' && playerFrozen === false) {
        if(gamePaused === false) {
            gamePaused = true;
                console.log("P has been pressed and gamePaused = "+gamePaused);
        }else{
            gamePaused = false;
                console.log("P has been pressed and gamePaused = "+gamePaused);
        }
    }
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        80: 'p'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
