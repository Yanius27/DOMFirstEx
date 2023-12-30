/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

// CONCATENATED MODULE: ./src/js/Board.js
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
}
// CONCATENATED MODULE: ./src/js/App.js

class App {
  constructor() {
    this.position = undefined;
    this.container = undefined;
    this.board = new Board(4);
    this.board.generateBoard();
    this.intervalId = undefined;
    this.score = undefined;
    this.p = undefined;
  }
  init() {
    this.drawBoard();
    this.setListeners();
    this.interval();
  }
  drawBoard() {
    this.container = document.createElement("div");
    this.container.classList.add("container");
    this.p = document.createElement("p");
    this.p.classList.add("score");
    this.score = document.createElement("span");
    this.score.classList.add("score_span");
    this.score.textContent = 0;
    this.p.textContent = `Счёт: `;
    this.p.appendChild(this.score);
    this.board.cells.forEach(el => {
      this.container.appendChild(el);
    });
    document.documentElement.children[1].appendChild(this.p);
    document.documentElement.children[1].appendChild(this.container);
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
    this.board.cells.forEach(el => {
      el.addEventListener("click", () => {
        if (el.id == this.position) {
          this.score.textContent = +this.score.textContent + 1;
          el.classList.add("clickedEnemy");
          clearInterval(this.intervalId);
          setTimeout(() => {
            el.classList.remove("clickedEnemy");
            el.classList.remove("cell_withEnemy");
            this.interval();
          }, 300);
        }
      });
    });
  }
  interval() {
    this.intervalId = setInterval(() => {
      this.drawEnemy();
    }, 800);
  }
}
// CONCATENATED MODULE: ./src/index.js


const app = new App();
app.init();
/******/ })()
;