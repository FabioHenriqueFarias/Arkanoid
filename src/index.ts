import { CanvasView } from "./View/CanvasView";
import { Ball } from "./sprites/Ball"; 
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";
import { Collision } from "./Collison";

// Imagens

import PADDLE_IMAGE  from "./images/paddle.png";
import BALL_IMAGE from "./images/ball.png";

// Level and colors

import {
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_STARTX,
    BALL_SPEED,
    BALL_SIZE,
    BALL_STARTX,
    BALL_STARTY
} from './setup';

import { createBricks } from "./helpers";

let gameOver = false;
let score = 0;

const setGameOver = (view: CanvasView) => {
    view.drawInfo('Game Over!');
    gameOver = false;
}

const setGameWin = (view: CanvasView) => {
    view.drawInfo('Game Won!');
    gameOver = false;
}

const gameLoop = (
    view: CanvasView,
    bricks: Brick[],
    paddle: Paddle,
    ball: Ball, 
    collision: Collision
    ) => {
        view.clear();
        view.drawBrick(bricks);
        view.drawSprite(paddle);
        view.drawSprite(ball);

        //Move Ball
        ball.moveBall()


        // Move paddle and check so it won't exit the playfield
        if(
            (paddle.isMovingLeft && paddle.pos.x > 0) ||
            (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)
        ){
            paddle.movePaddle();
        }

        collision.checkBallCollision(ball, paddle, view);
        const collidingBrick = collision.isCollidingBricks(ball, bricks);

        if(collidingBrick){
            score += 1;
            view.drawScore(score);
        }

        // Game Over when ball leaves playField 
        if(ball.pos.y > view.canvas.height) gameOver = true;

        // If fame won, set gameOver and display win
        if(bricks.length === 0) setGameWin(view);

        // Return if gameover and don't run the requestAnimationFrame
        if(gameOver) return setGameOver(view);


        requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision))
}

const startGame = (view: CanvasView) =>{
    // Reset displays
    score = 0;
    view.drawInfo('');
    view.drawScore(0);

    // Create a collision instance
    const collision = new Collision();

    // create all bricks
    const bricks = createBricks();

    // Create a Ball
    const ball = new Ball(
        BALL_SPEED,
        BALL_SIZE,
        {
            x: BALL_STARTX,
            y:BALL_STARTY
        },
        BALL_IMAGE
    )    

    // Create a Paddle
    const paddle = new Paddle(
        PADDLE_SPEED,
        PADDLE_WIDTH,
        PADDLE_HEIGHT,
        {
          x: PADDLE_STARTX,  
          y: view.canvas.height - PADDLE_HEIGHT - 5
        },
        PADDLE_IMAGE
    );

    gameLoop(view, bricks, paddle, ball, collision);
}

// create a new View
const view = new CanvasView('#playField');
view.initStartButton(startGame);