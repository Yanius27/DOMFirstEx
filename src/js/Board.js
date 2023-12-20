export default class Board {
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