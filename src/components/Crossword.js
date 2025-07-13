import React, { useState, useEffect } from 'react';
import './Crossword.css';

const Crossword = ({ data }) => {
  const [grid, setGrid] = useState(data.grid);
  const [clueNumbers, setClueNumbers] = useState({});

  useEffect(() => {
    const newClueNumbers = {};
    Object.keys(data.clues.across).forEach((number) => {
      const { row, col } = data.clues.across[number];
      newClueNumbers[`${row}-${col}`] = number;
    });
    Object.keys(data.clues.down).forEach((number) => {
      const { row, col } = data.clues.down[number];
      newClueNumbers[`${row}-${col}`] = number;
    });
    setClueNumbers(newClueNumbers);
  }, [data.clues]);

  const handleChange = (e, row, col) => {
    const newGrid = [...grid];
    newGrid[row][col] = e.target.value.toUpperCase();
    setGrid(newGrid);

    checkAnswers(newGrid);
  };

  const checkAnswers = (currentGrid) => {
    Object.keys(data.clues.across).forEach((number) => {
      const { answer, row, col } = data.clues.across[number];
      const word = currentGrid[row].slice(col, col + answer.length).join('');
      if (word === answer) {
        alert(`Correct! Across clue ${number}: ${answer}`);
      }
    });

    Object.keys(data.clues.down).forEach((number) => {
      const { answer, row, col } = data.clues.down[number];
      let word = '';
      for (let i = 0; i < answer.length; i++) {
        word += currentGrid[row + i][col];
      }
      if (word === answer) {
        alert(`Correct! Down clue ${number}: ${answer}`);
      }
    });
  };

  const numCols = data.grid[0].length;

  return (
    <div className="crossword">
      <div className="grid" style={{ gridTemplateColumns: `repeat(${numCols}, 40px)` }}>
        {grid.flat().map((cell, index) => {
          const row = Math.floor(index / numCols);
          const col = index % numCols;
          const clueNumber = clueNumbers[`${row}-${col}`];

          return (
            <div key={`${row}-${col}`} className="cell">
              {clueNumber && <span className="clue-number">{clueNumber}</span>}
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
          {Object.entries(data.clues.across).map(([number, { clue }]) => (
            <div key={number}>{`${number}. ${clue}`}</div>
          ))}
        </div>
        <div className="down">
          <h3>Down</h3>
          {Object.entries(data.clues.down).map(([number, { clue }]) => (
            <div key={number}>{`${number}. ${clue}`}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Crossword;
