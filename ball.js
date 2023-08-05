export default class Ball {
  constructor(game) {
    //allow it to have the same width and height as the border
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;

    //size of ball
    this.radius = 10;
    //position of the ball
    this.position = {
      posX: 260,
      posY: 400,
    };
    //speed of travel (pixel per second)
    this.velocity = {
      vX: 100,
      vY: 100,
    };

    this.image = new Image();
    this.image.src = "resource/GameResource/Ball/MetalBall1.png";
  }

  get top() {
    return this.position.posY - this.radius;
  }

  get bottom() {
    return this.position.posY + this.radius;
  }

  get left() {
    return this.position.posX - this.radius;
  }

  get right() {
    return this.position.posX + this.radius;
  }

  //draw a ball
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.position.posX,
      this.position.posY,
      this.radius,
      0,
      2 * Math.PI
    );

    ctx.lineWidth = 2;
    ctx.strokeStyle = "pink";
    ctx.stroke();
    ctx.closePath();

    ctx.drawImage(
      this.image,
      this.position.posX - this.radius,
      this.position.posY - this.radius,
      this.radius * 2,
      this.radius * 2
    );
  }
  //stop the ball from going beyond the game border
  update(deltaTime) {
    this.position.posX += this.velocity.vX * deltaTime;
    this.position.posY += this.velocity.vY * deltaTime;

    //collsion ball and wall
    //Right wall
    if (
      this.right > this.gameWidth ||
      //Left wall
      this.left < 0
    ) {
      this.velocity.vX = -this.velocity.vX;
    }
    //Bottom Wall
    if (this.bottom > this.gameHeight) {
      this.position = {
        posX: 260,
        posY: 400,
      };
      if (this.game.lives > 0) {
        this.game.lives--;
      } else if (this.game.lives == 0) {
        this.game.gameState = "gameover";
      }
    }
    //Top of the wall
    if (this.top < 0) {
      this.velocity.vY = -this.velocity.vY;
    }
    //Board Collision
    if (
      this.bottom >= this.game.board.top &&
      this.position.posX > this.game.board.left &&
      this.position.posX < this.game.board.right
    ) {
      //reverse the speed of the ball after hitting the board
      this.velocity.vY = -this.velocity.vY;

      //position the ball just above the ball
      this.position.posY = this.game.board.position.y - this.radius;
    }
  }
}
