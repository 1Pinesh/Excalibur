export function detectCollision(ball, brick) {
  if (
    ball.bottom >= brick.top &&
    ball.top < brick.bottom &&
    ball.left < brick.right &&
    ball.right > brick.left
  ) {
    // Collision detected on top or bottom side of brick
    return "TB";
  }

  if (
    ball.right >= brick.left &&
    ball.left < brick.right &&
    ball.top < brick.bottom &&
    ball.bottom > brick.top
  ) {
    // Collision detected on left or right side of brick
    return "LR";
  }
}
