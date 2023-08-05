import { level1, level2 } from "./levels.js";
//create a  button element
const startBtn = document.createElement("button");
startBtn.classList.add("start-btn");

const lvl2 = document.createElement("Button");
lvl2.classList.add("lvl1");
const lvl3 = document.createElement("Button");
lvl3.classList.add("lvl2");

//Title
const startTitle = document.createElement("h1");
startTitle.classList.add("startTitle");
const lvlSelectTitle = document.createElement("h1");
lvlSelectTitle.classList.add("lvlSelectTitle");
const endTitle = document.createElement("h1");
endTitle.classList.add("endTitle");

export default class MainMenu {
  constructor(game) {
    //assign the game object to instance variable
    this.game = game;
    this.startButton = false;
    // this.levelsButton = false;
    this.lvl2btn = false;
    this.lvl3btn = false;

    this.elementUI();
  }

  elementUI() {
    // Menu Title
    startTitle.textContent = "Excalibur";
    endTitle.textContent = "Game Over";

    //button title
    startBtn.textContent = "Start";

    lvl2.textContent = "Level 2";
    lvl3.textContent = "Level 3";

    //adding event handler to start button and select
    startBtn.addEventListener("click", () => {
      //start button is pressed
      this.startButton = true;
    });

    lvl2.addEventListener("click", () => {
      this.lvl2btn = true;
      this.game.setLevel(level2);
    });

    lvl3.addEventListener("click", () => {
      this.lvl3btn = true;
      this.game.setLevel(level3);
    });

    // Add buttons to the page
    document.body.appendChild(startBtn);
    document.body.appendChild(lvl2);
    document.body.appendChild(lvl3);
  }

  update() {
    if (this.startButton) {
      this.game.gameState = "running";
      document.body.removeChild(startBtn);
      document.body.removeChild(startTitle);
      document.body.removeChild(lvl2);
      document.body.removeChild(lvl3);
    } else if (this.lvl2btn) {
      this.game.gameState = "running";
      document.body.removeChild(startBtn);
      document.body.removeChild(startTitle);
      document.body.removeChild(lvl2);
      document.body.removeChild(lvl3);
    } else if (this.lvl3btn) {
      this.game.gameState = "running";
      document.body.removeChild(startBtn);
      document.body.removeChild(startTitle);
      document.body.removeChild(lvl2);
      document.body.removeChild(lvl3);
    }
  }

  draw(ctx) {
    //Clear the canvas and add the title of the start level
    ctx.clearRect(0, 0, this.game.gameWidth, this.game.gameHeight);
    document.body.appendChild(startTitle);
  }
}
