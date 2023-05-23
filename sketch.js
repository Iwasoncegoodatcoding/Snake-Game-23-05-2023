//Board
//Snake's head
//Food
//Snake control
//Grow the snake & make new food
//To make the rest of the snake's body to follow the snake
//Enhance

var board, cols = 20, rows = 20, cellSize = 20;
var context;
var snakeX = cols*cellSize/2 /*200 from left*/, snakeY = rows*cellSize/2 /*200 from top*/;
var foodX, foodY;
var velocityX = 0, velocityY = 0;
var snake = [];
snake.push([snakeX, snakeY]);

var gameState = true;

window.onload = function(){
    board = document.getElementById("board");
    board.width = cols*cellSize;
    board.height = rows*cellSize;
    context = board.getContext("2d");
    setInterval(draw, 100);
    food();
    document.addEventListener("keyup", changeDirection)
}

function draw(){

    if(gameState == true){
        context.fillStyle = "green";
        context.fillRect(0, 0, board.width, board.height);

        //Food
        context.fillStyle = "red";
        context.fillRect(foodX, foodY, 20, 20);

        //Snake
        context.fillStyle = "black";
        context.fillRect(snakeX, snakeY, 20, 20);

        //Moving the Snake
        snakeX = velocityX * cellSize + snakeX;
        snakeY = velocityY * cellSize + snakeY;

        //Making body parts other than head for the snake
        for(var i = 0; i < snake.length; i++){
            context.fillStyle = "black";
            context.fillRect(snake[i][0], snake[i][1], 20, 20);
        }
        
        //Relocating the food each time the snake ate it
        if(snakeX == foodX && snakeY == foodY){
            snake.push([foodX, foodY]);
            food();
        }

        for(var i = snake.length-1; i > 0; i--){
            snake[i] = snake[i-1];
        }

        if(snake.length > 0){
            snake[0] = [snakeX, snakeY];
        }

        if(snakeX<0 || snakeX > cols*cellSize || snakeY < 0 || snakeY > rows*cellSize){
            gameState = false;
            alert("Game Over. Subscribe to Yo Code");
        }
        for(var i = 1; i < snake.length; i++){
            if(snakeX == snake[i][0] && snakeY == snake[i][1]){
                gameState = false;
                alert("Game Over. Subscribe to Yo Code");
            }
        }
    }
    else{
        return;
    }
}

function food(){
    foodX = Math.floor(Math.random() * cols) * cellSize;
    foodY = Math.floor(Math.random() * rows) * cellSize;
}

function changeDirection(e){
    console.log(e.code);
    if(e.code == "ArrowUp" && velocityY!=1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY!=-1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowRight" && velocityX!=-1){
        velocityX = 1;
        velocityY = 0;
    }
    else if(e.code == "ArrowLeft" && velocityX!=1){
        velocityX = -1;
        velocityY = 0;
    }
}