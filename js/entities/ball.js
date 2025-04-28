// ball.js - Ball entity
// This file contains the Ball class that represents the bouncing ball

import { DEFAULTS } from '../constants.js';

export class Ball {
  constructor(game) {
    this.game = game;
    this.size = DEFAULTS.BALL_SIZE;
    this.x = game.width / 2;
    this.y = game.height - 30;
    this.speed = DEFAULTS.BALL_SPEED;
    this.dx = this.speed;
    this.dy = -this.speed;
    console.log('Ball CREATED');
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;


    // Wall collisions
    if (this.x + this.size > this.game.width || this.x - this.size < 0) {
      this.dx = -this.dx;
    }

    if (this.y - this.size < 0) {
      this.dy = -this.dy;
    }

    // Paddle collision
    if (this.collidesWith(this.game.paddle)) {
      this.dy = -this.dy;
      this.y = this.game.paddle.y - this.size; // move ball above paddle
    }

    // Bottom of screen
    if (this.y - this.size > this.game.height) {
      this.game.ballLost();
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  }

  collidesWith(object) {
    return (
      this.x + this.size > object.x &&
      this.x - this.size < object.x + object.width &&
      this.y + this.size > object.y &&
      this.y - this.size < object.y + object.height
    );
  }

  reset() {
    this.x = this.game.width / 2;  // Reset ball's X position to the center of the canvas
    this.y = this.game.height - 30;  // Reset ball's Y position just above the paddle
    this.dx = 2;  // Reset the X direction of the ball (speed)
    this.dy = -2;  // Reset the Y direction of the ball (speed)
  }

}
