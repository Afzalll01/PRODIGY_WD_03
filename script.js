let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let gameMode = "ai";

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const modeSelector = document.getElementById("mode");

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  
  [0, 4, 8], [2, 4, 6]             
];

function setMode() {
  gameMode = modeSelector.value;
  resetGame();
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  makeMove(index, currentPlayer);

  if (gameMode === "ai" && gameActive && currentPlayer === "O") {
    setTimeout(aiMove, 300);
  }
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
  checkResult(player);
}

function aiMove() {
  let emptyCells = board.map((val, idx) => val === "" ? idx : null).filter(v => v !== null);
  if (emptyCells.length === 0) return;

  let aiIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(aiIndex, "O");
}

function checkResult(player) {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      statusText.textContent = `${player} wins!`;
      gameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }


  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (gameMode === "multiplayer" || (gameMode === "ai" && currentPlayer === "X")) {
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
setMode(); // initialize game
