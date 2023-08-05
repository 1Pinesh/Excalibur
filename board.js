export default class Board {
  constructor(game) {
    //allow it to have the same width and height and the border
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    //Width and height of board
    this.width = 150;
    this.height = 20;
    //position of the board
    this.position = {
      x: 350,
      y: 570,
    };

    //speed of board
    this.velocity = {
      MaxVX: 180,
    };
    //get board image
    this.image = new Image();
    this.image.src = "resource/GameResource/Board/brickOld.png";

    //value use to move board
    this.moveRight = false;
    this.moveLeft = false;
  }
  get top() {
    return this.position.y;
  }

  get bottom() {
    return this.position.y + this.height;
  }

  get left() {
    return this.position.x;
  }

  get right() {
    return this.position.x + this.width;
  }

  //draws the board
  draw(ctx) {
    //colour
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;

    // Draw the outline
    ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
  }

  //update the paddle position
  update(deltaTime) {
    this.position.x +=
      this.velocity.MaxVX * (this.moveRight - this.moveLeft) * deltaTime;
    //if board touch left border it stops
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    //if board touch right border it stops
    if (this.position.x + this.width > this.gameWidth) {
      this.position.x = this.gameWidth - this.width;
    }
  }
}
