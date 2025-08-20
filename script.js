let tiles = [];
const puzzle = document.getElementById("puzzle");
const shuffleBtn = document.getElementById("shuffleBtn");
const resetBtn = document.getElementById("resetBtn");
const movesCountElem = document.getElementById("movesCount");

let moves = 0;
let solvedTiles = [];

function initPuzzle() {
  tiles = [...Array(8).keys()].map(i => i + 1);
  tiles.push("");
  moves = 0;
  movesCountElem.textContent = moves;
  solvedTiles = tiles.slice();
  render();
}

function render() {
  puzzle.innerHTML = "";
  tiles.forEach((num, index) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    if (num === "") {
      tile.classList.add("empty");
    } else {
      tile.textContent = num;
      tile.addEventListener("click", () => moveTile(index));
      if (num === solvedTiles[index]) {
        tile.classList.add("correct");
      }
    }
    puzzle.appendChild(tile);
  });
}

function moveTile(index) {
  const emptyIndex = tiles.indexOf("");
  const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - 3, emptyIndex + 3];
  
  // Prevent horizontal wraparound
  if (validMoves.includes(index)) {
    if ((emptyIndex % 3 === 0 && index === emptyIndex - 1) ||
        (emptyIndex % 3 === 2 && index === emptyIndex + 1)) {
      return;
    }
    [tiles[emptyIndex], tiles[index]] = [tiles[index], tiles[emptyIndex]];
    moves++;
    movesCountElem.textContent = moves;
    render();
    checkWin();
  }
}

function easyShuffle(movesCount = 10) {
  let emptyIndex = tiles.indexOf("");
  const directions = [-1, 1, -3, 3];

  for (let i = 0; i < movesCount; i++) {
    let possibleMoves = directions.filter(dir => {
      let newIndex = emptyIndex + dir;
      if (newIndex < 0 || newIndex >= tiles.length) return false;
      if ((emptyIndex % 3 === 0 && dir === -1) || (emptyIndex % 3 === 2 && dir === 1)) return false;
      return true;
    });
    let move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    let swapIndex = emptyIndex + move;
    [tiles[emptyIndex], tiles[swapIndex]] = [tiles[swapIndex], tiles[emptyIndex]];
    emptyIndex = swapIndex;
  }
  moves = 0;
  movesCountElem.textContent = moves;
  render();
}

function reset() {
  tiles = solvedTiles.slice();
  moves = 0;
  movesCountElem.textContent = moves;
  render();
}

function checkWin() {
  const win = tiles.slice(0, 8).every((val, i) => val === i + 1);
  if (win) {
    alert(`🎉 Congratulations! You solved the puzzle in ${moves} moves!`);
  }
}

shuffleBtn.addEventListener("click", () => easyShuffle(10));
resetBtn.addEventListener("click", reset);

initPuzzle();
