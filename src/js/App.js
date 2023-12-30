import Board from "./Board";

export default class App {
  constructor() {
    this.board = new Board(4);
  }

  init() {
    this.board.generateBoard();
    this.board.drawBoard();
    this.setListeners();
    this.interval();
  }

  drawEnemy() {
    if (this.position || this.position === 0) {
      this.board.cells[this.position].classList.remove("cell_withEnemy");
    }
    this.randomPosition();
    const randomCell = document.getElementById(this.position);
    randomCell.classList.add("cell_withEnemy");
  }

  randomPosition() {
    const newPosition = Math.floor(Math.random() * this.board.size);
    if (newPosition !== this.position) {
      this.position = newPosition;
    } else {
      this.randomPosition();
    }
  }

  setListeners() {
    this.board.container.addEventListener("click", (event) => {
      if (event.target.id == this.position) {
        this.board.scoreP.children[0].textContent = +this.board.scoreP.children[0].textContent + 1;
        event.target.classList.add("clickedEnemy");
        clearInterval(this.intervalId);
        setTimeout(() => {
          event.target.classList.remove("clickedEnemy");
          event.target.classList.remove("cell_withEnemy");
          this.interval();
        }, 300);
        }
      });
  }

  interval() {
    this.intervalId = setInterval(() => {
      this.drawEnemy();
    }, 800);
  }
}
