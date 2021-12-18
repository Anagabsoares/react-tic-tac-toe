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
  // Wave 2

  const [squareValue, setSquareValue] = useState(PLAYER_1);

  const flatArray = (squares) => {
    const list = [];
    for (let arr of squares) {
      for (let item of arr) {
        list.push(item);
      }
    }
    return list;
  };

  const changeSquareValue = (event, squares) => {
    const list = flatArray(squares);
    const obj = list.find((o) => o.id == event.target.id - 1);
    if (!obj.value) {
      event.target.value = squareValue;
      squareValue === PLAYER_2
        ? setSquareValue(PLAYER_1)
        : setSquareValue(PLAYER_2);
      obj.value = event.target.value;
    }
  };

  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

  const checkForWinner = (squares) => {
    for (let i = 0; i < 3; i++) {
      //// checks columns
      if (
        squares[0][i]['value'] == squares[1][i]['value'] &&
        squares[1][i]['value'] == squares[2][i]['value'] &&
        squares[0][i]['value'] != ''
      ) {
        return `winner is: ${squares[0][i]['value']}`;
      } else if (
        //// checks rows
        squares[i][0]['value'] == squares[i][1]['value'] &&
        squares[i][0]['value'] == squares[i][2]['value'] &&
        squares[i][0]['value'] != ''
      ) {
        return `winner is ${squares[i][0]['value']}`;
      } else {
        return `Current Player: ${squareValue}`;
      }
    }
    ////// checks diagonals
    if (
      squares[0][0]['value'] == squares[1][1]['value'] &&
      squares[0][0]['value'] == squares[2][2]['value'] &&
      squares[0][0]['value'] != ''
    ) {
      return squares[0][0]['value'];
    }
    if (
      squares[0][2]['value'] == squares[1][1]['value'] &&
      squares[0][2]['value'] == squares[2][0]['value'] &&
      squares[0][2]['value'] != ''
    ) {
      return squares[0][2]['value'];
    }
  };

  // useEffect(winner(), []);

  const resetGame = (e) => {
    setSquareValue(PLAYER_1);
    setSquares(generateSquares());
  };

  const displayPlayer = `${checkForWinner(squares)}`;

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2> {displayPlayer}</h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board
          onClickCallback={(event) => changeSquareValue(event, squares)}
          squares={squares}
        />
      </main>
    </div>
  );
};

export default App;
