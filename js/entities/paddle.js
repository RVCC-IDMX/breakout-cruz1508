// paddle.js - Paddle entity
// This file contains the Paddle class that represents the player-controlled paddle

import { DEFAULTS } from '../constants.js';

export class Paddle {
  constructor(game) {
    // TODO: Initialize the paddle properties
    this.game = game;
    this.width = DEFAULTS.PADDLE_WIDTH;
    this.height = DEFAULTS.PADDLE_HEIGHT;
    this.x = (game.width - this.width) / 2;
    this.y = game.height - this.height - 10;
    this.speed = DEFAULTS.PADDLE_SPEED;
    this.dx = 0;
  }

  update() {
    // TODO: Update the paddle position based on its current direction
    this.x += this.dx;

    // Keep the paddle within the game boundaries
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.width > this.game.width) {
      this.x = this.game.width - this.width;
    }
  }

  draw(ctx) {
    // TODO: Draw the paddle on the canvas
    ctx.fillStyle = '#0095DD'; // Paddle color
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  moveLeft() {
    // TODO: Set the paddle's direction to move left
    this.dx = -this.speed;
  }

  moveRight() {
    // TODO: Set the paddle's direction to move right
    this.dx = this.speed;
  }

  stop() {
    // TODO: Stop the paddle's movement
    this.dx = 0;
  }

  setPosition(x) {
    // TODO: Set the paddle's position based on mouse/touch input
    this.x = x - this.width / 2;

    // Keep the paddle within the game boundaries
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.width > this.game.width) {
      this.x = this.game.width - this.width;
    }
  }
}
