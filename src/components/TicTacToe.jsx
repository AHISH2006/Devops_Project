import React, { useState, useEffect } from 'react';
import '../styles/tictactoe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameMode, setGameMode] = useState('human'); // 'human' or 'ai'
  const [difficulty, setDifficulty] = useState('medium'); // 'easy', 'medium', 'hard'

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const getAvailableMoves = (squares) => {
    return squares.reduce((moves, square, index) => {
      if (!square) moves.push(index);
      return moves;
    }, []);
  };

  const minimax = (squares, depth, isMaximizing) => {
    const winner = calculateWinner(squares);
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (squares.every(square => square !== null)) return 0;

    const moves = getAvailableMoves(squares);
    if (difficulty === 'easy' && Math.random() < 0.4) {
      return moves[Math.floor(Math.random() * moves.length)];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      let bestMove;
      for (let move of moves) {
        squares[move] = 'O';
        const score = minimax(squares, depth + 1, false);
        squares[move] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }
      }
      return depth === 0 ? bestMove : bestScore;
    } else {
      let bestScore = Infinity;
      let bestMove;
      for (let move of moves) {
        squares[move] = 'X';
        const score = minimax(squares, depth + 1, true);
        squares[move] = null;
        if (score < bestScore) {
          bestScore = score;
          bestMove = move;
        }
      }
      return depth === 0 ? bestMove : bestScore;
    }
  };

  useEffect(() => {
    if (gameMode === 'ai' && !xIsNext && !calculateWinner(board)) {
      const boardCopy = [...board];
      const move = minimax(boardCopy, 0, true);
      setTimeout(() => {
        handleClick(move);
      }, 500);
    }
  }, [xIsNext, gameMode]);

  const handleClick = (i) => {
    const boardCopy = [...board];
    if (calculateWinner(boardCopy) || boardCopy[i]) return;
    boardCopy[i] = xIsNext ? 'X' : 'O';
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => (
    <button className="square" onClick={() => handleClick(i)}>
      {board[i]}
    </button>
  );

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);
  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = 'Game Draw!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game-container">
      <h2>Tic Tac Toe</h2>
      <div className="game-controls">
        <select 
          value={gameMode} 
          onChange={(e) => {
            setGameMode(e.target.value);
            resetGame();
          }}
          className="game-select"
        >
          <option value="human">Human vs Human</option>
          <option value="ai">Human vs AI</option>
        </select>
        {gameMode === 'ai' && (
          <select 
            value={difficulty} 
            onChange={(e) => {
              setDifficulty(e.target.value);
              resetGame();
            }}
            className="game-select"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        )}
      </div>
      <div className="status">{status}</div>
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;