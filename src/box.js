
var Box = (function() {

    //  Set our constants first for the game canvas size and the backgound image.
    const CANVAS_WIDTH = 500;
    const CANVAS_HEIGHT = 300;

    var BACKGROUND_IMAGE = new Image();
    BACKGROUND_IMAGE.src = '/assets/background_night.jpg'; // Taken from a free site. Needs replacing!

    //  Then, create any common variables that are needed here that are shared thoughout the game
    var CANVAS;
    var CTX;    
    var PLAYER;      
    var ENEMIES_WAITING = [];
    var ENEMIES = [];
    var FRAME = 0;
    var RELEASE_RATE = 100;
         
    //  Entry function that needs to be made to setup the game canvas and starts the game.
    function Setup () {
        CANVAS = document.getElementById('GameCanvas');
        CTX = CANVAS.getContext("2d");
        CANVAS.width  = CANVAS_WIDTH;    
        CANVAS.height = CANVAS_HEIGHT;
        PLAYER = new Player();
        ENEMIES_WAITING = RandomEnemyArray(10,CANVAS_WIDTH);
        Play();            
    }

    //  The main loop that the game will run on is here, we check for collisions, game over 
    //  and then call it all again.
    function Play () {

        FRAME++;

        //  Set the background
        CTX.drawImage(BACKGROUND_IMAGE, 0, 0);

        //  Draw the player on the canvas, release add the enemies
        DrawPlayer();
        ReleaseEnemies();
        MoveEnemies();

        //  Detect if the box has touched an enemy now
        var collision = ENEMIES.findIndex(DetectCollision);
        console.log(collision)
        if (collision > -1) {
            ENEMIES.splice(collision,1);
        }

        //  Check if the player has any lives left and if so, let's call the next animation frame
        if (PLAYER.lives > 0) {
            requestAnimationFrame = 
                window.requestAnimationFrame || 
                window.webkitRequestAnimationFrame || 
                window.msRequestAnimationFrame || 
                window.mozRequestAnimationFrame;                
            requestAnimationFrame(Play);
        }
    }

    //  Releases an enemy
    function ReleaseEnemies () {
        if (FRAME%RELEASE_RATE == 0 && ENEMIES_WAITING.length) {            
            var releasedEnemy = ENEMIES_WAITING.shift();
            ENEMIES.push(releasedEnemy);
        }
    }

    //  While there are still enemies, we want to move these down the screen every
    function MoveEnemies () {
        if (ENEMIES.length || ENEMIES_WAITING.length) {
            ENEMIES.map(function (enemy) {                
                if (enemy.y < CANVAS_HEIGHT-enemy.height) {
                    DrawEnemy(enemy);                          
                    enemy.y++;
                }            
                else {
                    ENEMIES.shift();
                }
            });
        }
        else {
            console.log('No enemies left!');
        }
    }

    function DrawPlayer () {
        CTX.fillRect(PLAYER.x,PLAYER.y,PLAYER.width,PLAYER.height);
    }

    function DrawEnemy (enemy) {
        CTX.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }

    //  Let's setup the player's controls, and return a player object for use in the game
    function Player () {

        const keyup = 119;     // w
        const keydown = 115;    // s
        const keyleft = 97;    // a
        const keyright = 100;   // d
        const keyjump = 32;     // space

        //  Let's listen for when the player presses keys
        document.addEventListener('keypress', function (e) {
            var key = e.which || e.keyCode;

            if (key === keyup && PLAYER.y > 0) {
                PLAYER.y = PLAYER.y - PLAYER.speed;
            }
            else if (key === keydown && PLAYER.y < CANVAS_HEIGHT - PLAYER.height) {
                PLAYER.y = PLAYER.y + PLAYER.speed;
            }
            else if (key === keyleft && PLAYER.x > 0) {
                PLAYER.x = PLAYER.x - PLAYER.speed;
            }
            else if (key === keyright && PLAYER.x < CANVAS_WIDTH - PLAYER.width) {
                PLAYER.x = PLAYER.x + PLAYER.speed;
            }
            else if (key === keyjump) {
                console.log('jump');
            }
        });

        this.lives = 3;
        this.score = 0;
        this.height = 30;
        this.width = 30;
        this.speed = 18;
        this.x = CANVAS_WIDTH/2 - this.width/2;
        this.y = CANVAS_HEIGHT-this.height;
    }

    //  Create an array of random enemies, this will become the enemy starting points
    function RandomEnemyArray(length, max) {
        return Array.apply(null, Array(length)).map(function(_, i) {
            return new Enemy(Math.round(Math.random() * max));
        });
    }
   
    //  Creates the enemy object that is used in the enemies array, this has a starting X and Y 
    //  position, but the y is always at the top of the screen.
    function Enemy (x) {
        this.x = x;
        this.y = 0;
        this.width = 5;
        this.height = 5;
    }

    //  Returns if there has been a collision
    function DetectCollision (enemy) {
        return (enemy.x < PLAYER.x + PLAYER.width &&
            enemy.x + enemy.width > PLAYER.x &&
            enemy.y < PLAYER.y + PLAYER.height &&
            enemy.height + enemy.y > PLAYER.y)
    }

    return {
        Setup : Setup
    };

})();