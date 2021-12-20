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
      setCount(count + 1);
      event.target.value = currentPlayer;
      currentPlayer === PLAYER_2
        ? setCurrentPlayer(PLAYER_1)
        : setCurrentPlayer(PLAYER_2);
      obj.value = event.target.value;
    }
  };

  console.log(count);
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
        setWinner(squares[0][i]['value']);
      } else if (
        //// checks rows
        squares[i][0]['value'] == squares[i][1]['value'] &&
        squares[i][0]['value'] == squares[i][2]['value'] &&
        squares[i][0]['value'] != ''
      ) {
        setWinner(squares[i][0]['value']);
      }
    }
    ////// checks diagonals
    if (
      squares[0][0]['value'] == squares[1][1]['value'] &&
      squares[0][0]['value'] == squares[2][2]['value'] &&
      squares[0][0]['value'] != ''
    ) {
      setWinner(squares[0][0]['value']);
    }
    if (
      squares[0][2]['value'] == squares[1][1]['value'] &&
      squares[0][2]['value'] == squares[2][0]['value'] &&
      squares[0][2]['value'] != ''
    ) {
      setWinner(squares[0][2]['value']);
    }
    return winner;
  };

  // set Winner and avoid rerendering
  useEffect(() => {
    checkForWinner(squares);
  });

  // if (winner != null) {
  //   document.getElementsById('display').textContent = `winner is ${winner}`;
  // } else {
  //   document.getElementById(
  //     'display'
  //   ).textContent = `currentPlayer ${currentPlayer}`;
  // }

  // Find a way to disable onclick when winner is defined
  // https://codesandbox.io/s/youthful-bouman-j60s4?from-embed
  // refactor using ternary
  let display = '';
  if (winner != null) {
    display = `winner is ${winner}`;
  } else if (winner == null && count > 8) {
    display = 'it is a Tie';
  } else {
    display = `currentPlayer ${currentPlayer}`;
  }

  // disable clicks after findind a winner
  useEffect(() => {
    if (winner != null) {
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
        <h2>{display}</h2>
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
