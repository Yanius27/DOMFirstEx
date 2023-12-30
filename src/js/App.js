import Board from "./Board";
import Goblin from './Goblin';

export default class App {
  constructor() {
    this.board = new Board(4);
    this.goblin = new Goblin();
  }

  init() {
    this.board.generateBoard();
    this.board.drawBoard();
    this.setListeners();
    this.interval();
  }

  drawEnemy() {
    this.randomPosition();
    const randomCell = document.getElementById(this.position);
    randomCell.append(this.goblin.element);
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
      if (event.target.classList.contains('goblin')) {
        this.board.scoreP.children[0].textContent = +this.board.scoreP.children[0].textContent + 1;
        event.target.classList.add("clickedEnemy");
        clearInterval(this.intervalId);
        setTimeout(() => {
          event.target.classList.remove("clickedEnemy");
          event.target.remove();
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
