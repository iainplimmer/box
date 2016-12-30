
var Box = (function() {

    //  Set our constants first for the game canvas size and the backgound image.
    const CANVAS_WIDTH = 400;
    const CANVAS_HEIGHT = 300;

    var BACKGROUND_IMAGE = new Image();
    BACKGROUND_IMAGE.src = '/assets/background_night.jpg'; // Taken from a free site. Needs replacing!

    //  Then, create any common variables that are needed here that are shared thoughout the game
    var CANVAS;
    var CTX;    
    var PLAYER;      
         
    //  Entry function that needs to be made to setup the game canvas and starts the game.
    function Setup () {
        CANVAS = document.getElementById('GameCanvas');
        CTX = CANVAS.getContext("2d");
        CANVAS.width  = CANVAS_WIDTH;    
        CANVAS.height = CANVAS_HEIGHT;
        PLAYER = new Player();
        Play();            
    }

    //  The main loop that the game will run on is here, we clear the canvas, 
    //  draw the ball, check for collisions, game over and then call it all again.
    function Play () {

        //  Set the background
        CTX.drawImage(BACKGROUND_IMAGE, 0, 0);

        //  Draw the player on the canvas
        DrawPlayer();

        console.log('Playing, lets get started then.....');

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

    //  Shortcut to clear the canvas
    function ClearCanvas () {
        CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    }

    function DrawPlayer () {
        CTX.fillRect(PLAYER.x,PLAYER.y,PLAYER.width,PLAYER.height);
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
        this.speed = 5;
        this.x = 0;
        this.y = 0;
    }

   
    function DetectCollision () {        
        return false;
    }

    return {
        Setup : Setup
    };

})();