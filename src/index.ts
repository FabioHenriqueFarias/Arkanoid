import { CanvasView } from "./View/CanvasView";
import { Ball } from "./sprites/Ball"; 
import { Brick } from "./sprites/Brick";
import { Paddle } from "./sprites/Paddle";

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
    // ball: Ball
    ) => {
        view.clear();
        view.drawBrick(bricks);
        view.drawSprite(paddle);

        // Move paddle and check so it won't exit the playfield
        if(
            (paddle.isMovingLeft && paddle.pos.x > 0) ||
            (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)
        ){
            paddle.movePaddle();
        }

        requestAnimationFrame(() => gameLoop(view, bricks, paddle))
}

const startGame = (view: CanvasView) =>{
    // Reset displays
    score = 0;
    view.drawInfo('');
    view.drawScore(0);

    // create all bricks
    const bricks = createBricks();

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

    gameLoop(view, bricks, paddle);
}

// create a new View

const view = new CanvasView('#playField');
view.initStartButton(startGame);