import Board from "./board.js";
import Ball from "./ball.js";
import Input from "./boardInput.js";
import { buildlevel, level1, level2, level3 } from "./levels.js";
import MainMenu from "./mainMenu.js";
import PowerUP from "./power.js";

//html elements for game over
const gameOverTitle = document.createElement("h2");
gameOverTitle.classList.add("gm-Title");
gameOverTitle.textContent = "Game Over";

const scoreTitle = document.createElement("h2");
scoreTitle.classList.add("score-title");
scoreTitle.textContent = "Score";

const playerScore = document.createElement("span");
playerScore.classList.add("p-score");

//Type Of Game State
const GAMESTATE = {
  MAINMENU: "mainmenu",
  RUNNING: "running",
  GAMEOVER: "gameover",
};

//levels
const levels = [level1, level2, level3];

//const power up name
const namePower = [
  "Extra Life",
  "Bonus Point",
  "Ball Speed",
  "Board Grow",
  "Board Small",
];

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    //set the game state to be Main Menu
    this.gameState = GAMESTATE.MAINMENU;
    //create a instance of main menu that take in game
    this.menu = new MainMenu(this);
    //set current level to 1 if no other lvl picked
    this.currentLevel = level1;
    //life remaining image
    this.Liveimage = new Image();
    this.Liveimage.src = "resource/GameResource/HeartRemaing.png";
    //timer for when a power up spawn
    this.powerUpTimer = 0;
  }

  initiate() {
    //brick
    this.bricks = buildlevel(this, this.currentLevel);
    //drawing the paddle
    this.board = new Board(this);
    //drawing the paddle
    this.Ball = new Ball(this);
    //Player Starting Life
    this.lives = 3;
    //Player Starting Score
    this.score = 0;
    new Input(this.board);
    //create empty power up outside the
    this.powerUP = new PowerUP(this, 1000, 1000, "", this.Ball, this.board);
  }

  //update the board by +5
  update(deltaTime) {
    switch (this.gameState) {
      //Show game menu
      case GAMESTATE.MAINMENU:
        this.menu.update();
        break;
      case GAMESTATE.RUNNING:
        // Start the game from either level picked or defualt to level 1
        this.bricks.forEach((brick) => {
          brick.update(deltaTime);
        });
        this.board.update(deltaTime);
        this.Ball.update(deltaTime);
        //remove brick that have been hit
        this.bricks = this.bricks.filter((brick) => !brick.brickHit);

        //decrement the power-up timer
        this.powerUpTimer -= deltaTime;
        if (this.powerUpTimer <= 0) {
          //instance of power up class with random power and nerfs
          const powerType =
            namePower[Math.floor(Math.random() * namePower.length)];
          const posX = Math.random() * 799;
          this.powerUP = new PowerUP(
            this,
            posX,
            0,
            powerType,
            this.Ball,
            this.board
          );
          this.powerUpTimer = Math.random() * 5 + 5;
        }
        //remove power up once it collided with board
        if (!this.powerUP.activted) {
          this.powerUP = new PowerUP(this, 1000, 1000, "");
        } else {
          this.powerUP.update(deltaTime);
        }
        // if no more bricks left in current level
        if (this.bricks.length === 0) {
          const prevScore = this.score + 100;
          const nextLevelIndex = levels.indexOf(this.currentLevel) + 1;
          if (nextLevelIndex < levels.length && this.lives > 0) {
            // if there's a next level
            this.currentLevel = levels[nextLevelIndex];
            this.bricks = buildlevel(this, this.currentLevel);
            this.initiate();
            this.score = prevScore;
          } else {
            // if no more levels left
            this.gameState = GAMESTATE.GAMEOVER;
          }
        }
        break;
      case GAMESTATE.GAMEOVER:
        document.body.appendChild(gameOverTitle);
        document.body.appendChild(scoreTitle);
        playerScore.textContent = this.score;
        document.body.appendChild(playerScore);
        break;
    }
  }

  //draw the objects
  draw(ctx) {
    if (this.lives !== 0) {
      switch (this.gameState) {
        case GAMESTATE.MAINMENU:
          this.menu.draw(ctx);
          break;
        case GAMESTATE.RUNNING:
          // this.board.draw(ctx);
          this.board.draw(ctx);
          this.Ball.draw(ctx);
          this.bricks.forEach((object) => object.draw(ctx));
          this.powerUP.draw(ctx);
          //Score Board
          ctx.fillText("Score: " + this.score, 625, 30);
          ctx.font = "30px Noto Sans, sans-serif";
          //loop to show lives
          drawLives(ctx, this.lives, this.Liveimage);
          break;
      }
    } else if (this.lives === 0) {
      switch (this.gameState) {
        case GAMESTATE.GAMEOVER:
          document.body.appendChild(gameOverTitle);
          document.body.appendChild(scoreTitle);
          playerScore.textContent = this.score;
          document.body.appendChild(playerScore);
          break;
      }
    }
  }
  //set level to specific level
  setLevel(level) {
    this.currentLevel = level;
    this.bricks = buildlevel(this, this.currentLevel);
    this.initiate();
  }
}

//draw number of live remaining
function drawLives(ctx, lives, image) {
  for (let i = 0; i < lives; i++) {
    const xPos = 30 + i * 40; // Calculate x position based on index
    ctx.drawImage(image, xPos - 15, 10, 30, 30);
  }
}
