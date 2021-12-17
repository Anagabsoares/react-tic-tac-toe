import React, { useState } from 'react';
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
      squareValue === PLAYER_2 ? setSquareValue(PLAYER_1) : setSquareValue(PLAYER_2);
      obj.value = event.target.value;
    }
  };

  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

  const checkForWinner = (squares) => {
    const x = 1;
    const o = 0;
    let counter = 0;

    let playerX = false;
    let PlayerO = false;

    // 0[ {id:0} {id:1} {id:2}]
    // 1[ {id:3} {id:4} {id:5}]
    // 2[ {id:6} {id:7} {id:9}]

    // Complete in Wave 3
    // You will need to:
    // 1. Go accross each row to see if
    console.log('inside check for winner');
    console.log(squares);

    if (
      squares[0][0]['value'] == 'x' &&
      squares[0][1]['value'] == 'x' &&
      squares[0][2]['value'] == 'x'
    ) {
      console.log('x winner');
    }

    for (let item of squares) {
      console.log(item);
      if (item['value'] == 'x') {
        counter += 1;
      }
    }

    //    3 squares in the same row match
    //    i.e. same value
    // 2. Go down each column to see if
    //    3 squares in each column match
    // 3. Go across each diagonal to see if
    //    all three squares have the same value.
  };

  const resetGame = (e) => {
    // Complete in Wave 4
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
