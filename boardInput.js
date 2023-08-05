export default class Input {
  constructor(board) {
    /**with this each key press a code will be presented by the browser.
     * we be able to use these code to allow certain movement to happen.
     */
    document.addEventListener("keydown", (event) => {
      // alert(event.code);
      switch (event.code) {
        case "ArrowLeft":
          board.moveLeft = true;
          break;
        case "ArrowRight":
          board.moveRight = true;
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.code) {
        case "ArrowLeft":
          board.moveLeft = false;
          break;
        case "ArrowRight":
          board.moveRight = false;
          break;
      }
    });
  }
}
