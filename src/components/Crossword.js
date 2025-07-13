import React, { useState } from 'react';
import './Crossword.css';

const Crossword = ({ data }) => {
  const [grid, setGrid] = useState(data.grid);
  const numCols = data.grid[0].length;

  const handleChange = (e, row, col) => {
    const newGrid = [...grid];
    newGrid[row][col] = e.target.value.toUpperCase();
    setGrid(newGrid);
  };

  return (
    <div className="crossword">
      <div className="grid" style={{ gridTemplateColumns: `repeat(${numCols}, 40px)` }}>
        {grid.flat().map((cell, index) => {
          const row = Math.floor(index / numCols);
          const col = index % numCols;
          return (
            <div key={`${row}-${col}`} className="cell">
              {cell !== 0 && (
                <input
                  type="text"
                  maxLength="1"
                  value={grid[row][col] === 0 ? '' : grid[row][col]}
                  onChange={(e) => handleChange(e, row, col)}
                />
              )}
            </div>
          );
        })}
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
