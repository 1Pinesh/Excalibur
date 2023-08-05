import { detectCollision } from "./collisionDetection.js";

export default class Brick {
  constructor(game, position) {
    // //allow it to have the same width and height as the border
    this.game = game;

    //position of the brick
    this.position = position;

    this.size = {
      width: 80,
      height: 34,
    };
    //Boolean propertly will show if brick is hit or not
    this.brickHit = false;
    this.point = 10;
    this.image = new Image();
    this.image.src = this.image.src = "resource/GameResource/Brick/Brick.png";
  }

  //get method for brick
  get top() {
    return this.position.y;
  }

  get bottom() {
    return this.position.y + this.size.height;
  }
  get left() {
    return this.position.x;
  }

  get right() {
    return this.position.x + this.size.width;
  }

  update() {
    //detect collsion with ball and brick

    if (detectCollision(this.game.Ball, this) === "LR") {
      this.game.Ball.velocity.vX = -this.game.Ball.velocity.vX;
      this.brickHit = true;
      this.game.score += this.point;
    } else if (detectCollision(this.game.Ball, this) === "TB") {
      this.game.Ball.velocity.vY = -this.game.Ball.velocity.vY;
      this.brickHit = true;
      this.game.score += this.point;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }
}
