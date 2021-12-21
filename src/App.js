import React, { useState, useEffect } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

const generateSquares = () => {
  const squares = [];
  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }
  return squares;
};

const App = () => {
  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [winner, setWinner] = useState(null);
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);

  // Wave 2

  const flatMatrix = (squares) => {
    const list = [];
    for (let arr of squares) {
      for (let item of arr) {
        list.push(item);
      }
    }
    return list;
  };

  const changeSquareValue = (event, squares) => {
    const list = flatMatrix(squares);
    const square = list.find((square) => square.id == event.target.id - 1);
    if (!square.value) {
      setCount(count + 1);
      event.target.value = currentPlayer;
      currentPlayer === PLAYER_2
        ? setCurrentPlayer(PLAYER_1)
        : setCurrentPlayer(PLAYER_2);
      square.value = event.target.value;
    }
    checkForWinner(squares);
  };

  const checkForWinner = (squares) => {
    let result = null;
    for (let i = 0; i < 3; i++) {
      //// checks columns
      if (
        squares[0][i]['value'] == squares[1][i]['value'] &&
        squares[0][i]['value'] == squares[2][i]['value'] &&
        squares[0][i]['value'] != ''
      ) {
        result = squares[0][i]['value'];
      } else if (
        //// checks rows
        squares[i][0]['value'] == squares[i][1]['value'] &&
        squares[i][0]['value'] == squares[i][2]['value'] &&
        squares[i][0]['value'] != ''
      ) {
        result = squares[i][0]['value'];
      }
      ////// checks diagonals
      else if (
        squares[0][0]['value'] == squares[1][1]['value'] &&
        squares[0][0]['value'] == squares[2][2]['value'] &&
        squares[0][0]['value'] != ''
      ) {
        result = squares[0][0]['value'];
      } else if (
        squares[0][2]['value'] == squares[1][1]['value'] &&
        squares[0][2]['value'] == squares[2][0]['value'] &&
        squares[0][2]['value'] != ''
      ) {
        result = squares[0][2]['value'];
      }
    }
    setWinner(result);
  };

  // set Winner and avoid rerendering

  let displayResult = '';
  if (winner != null) {
    displayResult = `Winner is ${winner}`;
  } else if (winner == null && count > 8) {
    displayResult = 'it is a Tie';
  } else {
    displayResult = `current Player ${currentPlayer}`;
  }

  // disable clicks after findind a winner
  // useEffect will be triggered every time winner changes
  useEffect(() => {
    if (winner) {
      setDisabled(true);
    }
  }, [winner]);

  const resetGame = () => {
    setSquares(generateSquares());
    setCurrentPlayer(PLAYER_1);
    setWinner(null);
    setDisabled(false);
    setCount(0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>{displayResult}</h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board
          disabled={disabled}
          onClickCallback={(event) => changeSquareValue(event, squares)}
          squares={squares}
        />
      </main>
    </div>
  );
};

export default App;
