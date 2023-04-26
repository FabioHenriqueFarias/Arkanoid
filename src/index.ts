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
    ball: Ball
    ) => {

}

const startGame = (view: CanvasView) =>{

}

// create a new View

const view = new CanvasView('#playField');
view.initStartButton(startGame);