export default class PowerUP {
  constructor(game, x, y, powerType, ball, board) {
    this.game = game;
    this.position = {
      x,
      y,
    };
    this.powerType = powerType;
    this.radius = 5;
    this.activted = true;
    this.ball = ball;
    this.board = board;

    // Load power-up image
    this.extraLifeImage = new Image();
    this.extraLifeImage.src = "resource/GameResource/PowerUp/Heart.png";

    this.bonusPoint = new Image();
    this.bonusPoint.src = "resource/GameResource/PowerUp/Bonus.png";

    this.speedBall = new Image();
    this.speedBall.src = "resource/GameResource/PowerUp/Speed-Ball1.png";

    this.boardGrow = new Image();
    this.boardGrow.src = "resource/GameResource/PowerUp/BoardIncrease.png";

    this.boardSmall = new Image();
    this.boardSmall.src = "resource/GameResource/PowerUp/BoardMinus.png";
  }

  update(deltaTime) {
    //speed at which power drops
    this.position.y += 200 * deltaTime;

    //check if power up has touched the baord
    const board = this.game.board;
    const boardCenter = board.position.x + board.width / 2;
    const powerUpCenter = this.position.x;

    // check the distance between power up centre and board centre
    const detectDistance = Math.hypot(
      powerUpCenter - boardCenter,
      board.position.y - this.position.y
    );

    if (detectDistance <= this.radius + board.width / 2) {
      // activate power and turn it to flase
      this.powerOn();
      this.activted = false;
    }
  }

  draw(ctx) {
    switch (this.powerType) {
      case "Extra Life":
        ctx.drawImage(
          this.extraLifeImage,
          this.position.x - this.radius,
          this.position.y - this.radius,
          this.radius * 10,
          this.radius * 10
        );
        break;
      case "Bonus Point":
        ctx.drawImage(
          this.bonusPoint,
          this.position.x - this.radius,
          this.position.y - this.radius,
          this.radius * 10,
          this.radius * 10
        );
        break;
      case "Ball Speed":
        ctx.drawImage(
          this.speedBall,
          this.position.x - this.radius,
          this.position.y - this.radius,
          this.radius * 15,
          this.radius * 10
        );
        break;
      case "Board Grow":
        ctx.drawImage(
          this.boardGrow,
          this.position.x - this.radius,
          this.position.y - this.radius,
          this.radius * 20,
          this.radius * 15
        );
        break;
      case "Board Small":
        ctx.drawImage(
          this.boardSmall,
          this.position.x - this.radius,
          this.position.y - this.radius,
          this.radius * 20,
          this.radius * 15
        );
    }
  }

  powerOn() {
    //tell what happen when a buff /nerf if activated
    switch (this.powerType) {
      case "Extra Life":
        //give player an extra life
        if (this.game.lives >= 3) {
          this.game.lives = 3;
        } else {
          this.game.lives++;
        }
        break;
      case "Bonus Point":
        this.game.score *= 2;
        break;
      case "Ball Speed":
        this.ball.velocity.vX = 300;
        this.ball.velocity.vY = 130;
        break;
      case "Board Grow":
        this.board.width = 200;
        break;
      case "Board Small":
        this.board.width = 50;
        break;
    }
  }
}
