import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';

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

  const [squareValue, setSquareValue] = useState('x');

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
      squareValue === 'o' ? setSquareValue('x') : setSquareValue('o');
      obj.value = event.target.value;
    }
  };

  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

  const checkForWinner = (squares) => {
    console.log('inside check for winner');
    console.log(squares);
    // Complete in Wave 3
    // You will need to:
    // 1. Go accross each row to see if
    //    3 squares in the same row match
    //    i.e. same value
    // 2. Go down each column to see if
    //    3 squares in each column match
    // 3. Go across each diagonal to see if
    //    all three squares have the same value.
  };

  const resetGame = (e) => {
    // Complete in Wave 4
    console.log('reload page');
  };

  const displayPlayer = `Current Player ${squareValue.toUpperCase()} ${checkForWinner(
    squares
  )}`;

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
