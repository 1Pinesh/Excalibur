import Brick from "./brick.js";

//brick setting
const BRICK_WIDTH = 80;
const BRICK_HEIGHT = 26;
const BRICK_START_X = 0;
const BRICK_START_Y = 50;

//function will be responsible for the level to be made
export function buildlevel(game, level) {
  let bricks = [];

  //for loop that loop through each row in array
  for (let rowIndex = 0; rowIndex < level.length; rowIndex++) {
    let row = level[rowIndex];
    //nested for loop that goes through each brick in row
    for (let brickIndex = 0; brickIndex < row.length; brickIndex++) {
      let brick = row[brickIndex];
      //if brick value is 1. Brick obj is created and add it to brick array
      if (brick == 1) {
        let position = {
          x: BRICK_START_X + BRICK_WIDTH * brickIndex,
          y: BRICK_START_Y + BRICK_HEIGHT * rowIndex,
        };
        bricks.push(new Brick(game, position));
      }
    }
  }
  return bricks;
}

//1 = brick , 0 = empty space
export const level1 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
  [1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // [0],
];

export const level2 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 0, 0, 1, 1, 0, 1],
  [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // [1, 1],
];

export const level3 = [
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 0, 0, 1, 1, 0, 1],
  [1, 1, 1, 0, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 0],
  // [1, 1, 1],
];
