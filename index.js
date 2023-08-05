import Game from "./game.js";

let canvas = document.getElementById("mainScreen");
let audio = document.getElementById("myAudio");
let ctx = canvas.getContext("2d");
let prevTime = 0;
//Two variable that you dont have people to change
const sWidth = 800;
const sHeight = 600;
let game = new Game(sWidth, sHeight);

window.game = game;
//initiate all the object e.g Ball, Board and Brick

game.initiate();

//Game Loop keep refreshing all object
function gameLoop(timeStamp) {
  audio.play();

  let deltaTime = timeStamp - prevTime || 0;

  //updates prevTime with the latest time stamp each loop.

  prevTime = timeStamp;

  //clear the canvas

  ctx.clearRect(0, 0, sWidth, sHeight);
  game.update(deltaTime / 800);
  game.draw(ctx);

  //like a loop that keep on creating objects and clearing them making it look animated

  requestAnimationFrame(gameLoop);
}

gameLoop();
