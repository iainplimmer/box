var Box = (function() {

    //  Set our constants first for the game rate and window size......
    const refreshRateInMilliseconds = 5;
    const canvasWidth = 500;
    const canvasHeight = 400;
    const leftKey = 122;    // Z
    const righttKey = 109;  // M

    //  Finally, create any common variables that are needed here that are shared thoughout the game, these are 
    //  named in uppercase so that they are more visible, i'm not just passing around functions at the moment
    var CANVAS;
    var CTX;    
    var PLAYER;         //  Current player/paddle information  
         
    //  Function to call that sets up the game canvas, sets up the canvas,
    //  the event listener and then starts the ball and the game
    function Setup () {
        CANVAS = document.getElementById('GameCanvas');
        CTX = CANVAS.getContext("2d");
        CANVAS.width  = canvasWidth;    
        CANVAS.height = canvasHeight;
        
        //Start the game loop
        Play();
    }

    //  The main loop that the game will run on is here, we clear the canvas, 
    //  draw the ball, check for collisions, game over and then call it all again.
    function Play () {

        //  Create the ball, player and wall if they are not setup
        if (!PLAYER) {        
            PLAYER = ResetPlayer();
        }

        console.log('playing!')

        //  Check if the player has any lives left and that the wall is still standing
        if (PLAYER.lives > 0) {
            setTimeout(Play, refreshRateInMilliseconds);
        }
    }

    //  Shortcut to clear the canvas
    function ClearCanvas () {
        CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    } 

    //  Let's setup the player's controls and return a player object for use in the game
    function ResetPlayer () {

        //  Let's listen for when the player presses keys
        document.addEventListener('keypress', function (e) {
            var key = e.which || e.keyCode;
            if (key === leftKey && PLAYER.paddleLeft > 0) { 
                PLAYER.paddleLeft = PLAYER.paddleLeft-40; 
            }
            else if (key === righttKey && (PLAYER.paddleLeft+PLAYER.paddleWidth) < canvasWidth) { 
                PLAYER.paddleLeft = PLAYER.paddleLeft+40; 
            }
        });

        //  Return the current player information   
        return {      
            score : 0,
            lives : 3
        };
    }

   
    function DetectCollision () {        
        return false;
    }

    return {
        Setup : Setup
    };

})();