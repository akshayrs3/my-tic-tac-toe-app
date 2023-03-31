import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (player === 'O' && winner === null) {
      const timeout = setTimeout(() => {
        const newBoard = [...board];
        const move = getAiMove(newBoard);
        newBoard[move] = player;
        setBoard(newBoard);
        setPlayer('X');
        checkWinner(newBoard);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [board, player, winner]);

  const handleClick = (index) => {
    if (board[index] === null && winner === null) {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      setPlayer(player === 'X' ? 'O' : 'X');
      checkWinner(newBoard);
    }
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
      }
    }
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const renderStatus = () => {
    if (winner) {
      return <div className="winner">Winner: {winner}</div>;
    } else {
      return <div className="next-player">Next player: {player}</div>;
    }
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setPlayer('X');
    setWinner(null);
  };

  const getAiMove = (board) => {
    const availableSquares = board
      .map((square, index) => (square === null ? index : null))
      .filter((square) => square !== null);
  
    const randomIndex = Math.floor(Math.random() * availableSquares.length);
    return availableSquares[randomIndex];
  };

  return (
    <div className="app">
      <div className="board">
        <div className="row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      {renderStatus()}
      <button className="reset" onClick={() => resetBoard()}>Reset Board</button>
    </div>
  );
}

export default App;
