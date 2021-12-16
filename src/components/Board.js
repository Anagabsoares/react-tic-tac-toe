import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';

const generateSquareComponents = (squares, onClickCallback) => {
  const sqr = [];
  let id = 0;

  for (let row of squares) {
    for (let col of row) {
      id++;
      sqr.push(
        <Square
          id={id}
          key={id}
          onClickCallback={onClickCallback}
          value={col.value}
        />
      );
    }
  }
  return sqr;
};

const Board = ({ squares, onClickCallback }) => {
  const squareList = generateSquareComponents(squares, onClickCallback);

  return (
    <div className="grid" role="button">
      {squareList}
    </div>
  );
};

Board.propTypes = {
  squares: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
      })
    )
  ),
  onClickCallback: PropTypes.func.isRequired,
};

export default Board;
