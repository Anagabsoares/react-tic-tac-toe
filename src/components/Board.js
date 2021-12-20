import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';

const generateSquareComponents = (squares, onClickCallback) => {
  let id = 0;
  return squares.map((row) => {
    return row.map((square) => {
      id += 1;
      return (
        <Square
          id={id}
          key={id}
          value={square.value}
          onClickCallback={onClickCallback}
        />
      );
    });
  });
};

//   for (let row of squares) {
//     for (let col of row) {
//       id++;
//       sqr.push(
//         <Square
//           id={id}
//           key={id}
//           onClickCallback={onClickCallback}
//           value={col.value}
//         />
//       );
//     }
//   }
//   return sqr;
// };

const Board = ({ squares, onClickCallback, disabled }) => {
  const squareList = generateSquareComponents(squares, onClickCallback);

  return (
    <div
      className="grid"
      role="button"
      style={disabled ? { pointerEvents: 'none', opacity: '1' } : {}}
    >
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
  disabled: PropTypes.bool.isRequired,
};

export default Board;
