const chessboard = document.getElementById("chessboard");
let selectedPiece = null;

// Initialize the chessboard
const board = [
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']
];

// Render the chessboard
function renderBoard() {
    chessboard.innerHTML = "";
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.classList.add((row + col) % 2 === 0 ? "light" : "dark");
            square.dataset.row = row;
            square.dataset.col = col;

            const piece = board[row][col];
            if (piece) {
                square.textContent = piece;
            }

            square.addEventListener("click", () => handleSquareClick(row, col));
            chessboard.appendChild(square);
        }
    }
}

// Handle square clicks
function handleSquareClick(row, col) {
    const piece = board[row][col];

    if (selectedPiece) {
        // Move the selected piece to the clicked square
        movePiece(selectedPiece.row, selectedPiece.col, row, col);
        selectedPiece = null;
        renderBoard();
    } else if (piece) {
        // Select the clicked piece
        selectedPiece = { row, col };
        highlightSquare(row, col);
    }
}

// Move a piece from (fromRow, fromCol) to (toRow, toCol)
function movePiece(fromRow, fromCol, toRow, toCol) {
    const piece = board[fromRow][fromCol];
    board[fromRow][fromCol] = "";
    board[toRow][toCol] = piece;
}

// Highlight the selected square
function highlightSquare(row, col) {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => square.classList.remove("highlight"));

    const square = document.querySelector(`.square[data-row="${row}"][data-col="${col}"]`);
    square.classList.add("highlight");
}

// Initialize the game
renderBoard();