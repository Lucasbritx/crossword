import React, { useState } from 'react';
import './Crossword.css';

const Crossword = ({ data }) => {
  const [grid, setGrid] = useState(data.grid);

  const handleChange = (e, row, col) => {
    const newGrid = [...grid];
    newGrid[row][col] = e.target.value.toUpperCase();
    setGrid(newGrid);
  };

  return (
    <div className="crossword">
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div key={colIndex} className="cell">
                {cell !== 0 && (
                  <input
                    type="text"
                    maxLength="1"
                    value={grid[rowIndex][colIndex] === 0 ? '' : grid[rowIndex][colIndex]}
                    onChange={(e) => handleChange(e, rowIndex, colIndex)}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="clues">
        <div className="across">
          <h3>Across</h3>
          {data.clues.across.map((clue, index) => (
            <div key={index}>{clue}</div>
          ))}
        </div>
        <div className="down">
          <h3>Down</h3>
          {data.clues.down.map((clue, index) => (
            <div key={index}>{clue}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Crossword;
