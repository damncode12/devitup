import React, { useState } from "react";
import "./App.css";

const initialBoard = [
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["r", "n", "b", "q", "k", "b", "n", "r"],
];

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);

  const handleCellClick = (row, col) => {
    if (!selectedPiece) {
      if (board[row][col] !== " ") {
        setSelectedPiece({ piece: board[row][col], row, col });
      }
    } else {
      const piece = selectedPiece.piece;
      const oldRow = selectedPiece.row;
      const oldCol = selectedPiece.col;
      const newBoard = [...board];
      newBoard[row][col] = piece;
      newBoard[oldRow][oldCol] = " ";
      setBoard(newBoard);
      setSelectedPiece(null);
    }
  };

  return (
    <div className="App">
      <h1>Chess Game</h1>
      <div className="chess-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`board-cell ${cell === " " ? "" : "occupied"}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
