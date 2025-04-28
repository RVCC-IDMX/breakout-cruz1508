// brick.js - Brick entity
// This file contains the Brick class that represents the breakable bricks

export class Brick {
  constructor(game, x, y, width, height, color) {
    // TODO: Initialize the brick properties
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.broken = false;
  }

  draw(ctx) {
    // TODO: Draw the brick on the canvas if it's not broken
    if (!this.broken) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);

      ctx.strokeStyle = '#000'; // Border Color
      ctx.lineWidth = 1;
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }

  break() {
    // TODO: Mark the brick as broken
    this.broken = true;
  }
}
