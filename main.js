/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/Board.js
class Board {
  constructor(size) {
    this.size = size ** 2;
    this.cells = [];
  }
  generateBoard() {
    for (let i = 0; i < this.size; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = i;
      this.cells.push(cell);
    }
  }

  //create board and adding it to a DOM
  drawBoard() {
    this.container = this.createContainer();
    this.scoreP = this.createScore();
    this.cells.forEach(el => {
      this.container.appendChild(el);
    });
    document.documentElement.children[1].appendChild(this.scoreP);
    document.documentElement.children[1].appendChild(this.container);
  }
  createContainer() {
    const container = document.createElement("div");
    container.classList.add("container");
    return container;
  }
  createScore() {
    const scoreP = document.createElement("p");
    scoreP.classList.add("score");
    const scoreSpan = document.createElement("span");
    scoreSpan.classList.add("score_span");
    scoreSpan.textContent = 0;
    scoreP.textContent = `Счёт: `;
    scoreP.appendChild(scoreSpan);
    return scoreP;
  }
}
;// CONCATENATED MODULE: ./src/js/Goblin.js
class Goblin {
  constructor() {
    this._element = document.createElement('img');
    this._element.src = 'https://github.com/netology-code/ahj-homeworks/blob/AHJ-50/dom/pic/goblin.png?raw=true';
    this._element.className = "goblin";
  }
  get element() {
    return this._element;
  }
}
;// CONCATENATED MODULE: ./src/js/App.js


class App {
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
    this.board.container.addEventListener("click", event => {
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
;// CONCATENATED MODULE: ./src/index.js


const app = new App();
app.init();
/******/ })()
;