// collision.js - Handles collision detection and response
// This file manages all collision-related logic in the game

import { DEFAULTS } from './constants.js';

export class CollisionManager {
  constructor(game) {
    this.game = game;
  }

  // Check for all collisions in the game
  checkCollisions() {
    if (!this.game.ball || !this.game.paddle) {
      return;
    }

    // Check different types of collisions
    this.checkPaddleCollision();
    this.checkBrickCollisions();
  }

  // Check if ball collides with paddle
  checkPaddleCollision() {
    const ball = this.game.ball;
    const paddle = this.game.paddle;

    if (
      ball.y + ball.size >= paddle.y &&
      ball.y - ball.size <= paddle.y + paddle.height &&
      ball.x + ball.size >= paddle.x &&
      ball.x - ball.size <= paddle.x + paddle.width
    ) {
      console.log('Ball collided with paddle');  // Debug message
      ball.dy = -ball.speed;
    }
  }


  // Check if ball collides with any bricks
  checkBrickCollisions() {
    const ball = this.game.ball;

    this.game.bricks.forEach(brick => {
      if (!brick.broken && ball.collidesWith(brick)) {
        brick.break();
        this.game.addScore(DEFAULTS.POINTS_PER_BRICK);
        this.calculateBounceDirection(ball, brick);
      }
    });
  }

  // Calculate how the ball should bounce after hitting a brick
  calculateBounceDirection(ball, brick) {
    const ballBottom = ball.y + ball.size;
    const ballTop = ball.y - ball.size;
    const ballRight = ball.x + ball.size;
    const ballLeft = ball.x - ball.size;

    const brickTop = brick.y;
    const brickBottom = brick.y + brick.height;
    const brickLeft = brick.x;
    const brickRight = brick.x + brick.width;

    const distances = {
      top: Math.abs(ballBottom - brickTop),
      bottom: Math.abs(ballTop - brickBottom),
      left: Math.abs(ballRight - brickLeft),
      right: Math.abs(ballLeft - brickRight)
    };

    const minDistance = Math.min(distances.top, distances.bottom, distances.left, distances.right);

    if (minDistance === distances.left || minDistance === distances.right) {
      ball.dx = -ball.dx; // Bounce horizontally
    } else {
      ball.dy = -ball.dy; // Bounce vertically
    }
  }
}
