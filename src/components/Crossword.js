import React, { useState, useEffect } from 'react';
import './Crossword.css';

const Crossword = ({ data }) => {
  const [grid, setGrid] = useState(data.grid);
  const [clues, setClues] = useState(data.clues);
  const [clueNumbers, setClueNumbers] = useState({});

  useEffect(() => {
    const newClueNumbers = {};
    Object.keys(clues.across).forEach((number) => {
      const { row, col } = clues.across[number];
      newClueNumbers[`${row}-${col}`] = number;
    });
    Object.keys(clues.down).forEach((number) => {
      const { row, col } = clues.down[number];
      newClueNumbers[`${row}-${col}`] = number;
    });
    setClueNumbers(newClueNumbers);
  }, [clues]);

  const handleChange = (e, row, col) => {
    const newGrid = [...grid];
    newGrid[row][col] = e.target.value.toUpperCase();
    setGrid(newGrid);

    checkAnswers(newGrid);
  };

  const checkAnswers = (currentGrid) => {
    const newClues = { ...clues };

    Object.keys(newClues.across).forEach((number) => {
      const { answer, row, col } = newClues.across[number];
      const word = currentGrid[row].slice(col, col + answer.length).join('');
      if (word === answer) {
        newClues.across[number].isCorrect = true;
      }
    });

    Object.keys(newClues.down).forEach((number) => {
      const { answer, row, col } = newClues.down[number];
      let word = '';
      for (let i = 0; i < answer.length; i++) {
        word += currentGrid[row + i][col];
      }
      if (word === answer) {
        newClues.down[number].isCorrect = true;
      }
    });

    setClues(newClues);
  };

  const numCols = data.grid[0].length;

  return (
    <div className="crossword">
      <div className="grid" style={{ gridTemplateColumns: `repeat(${numCols}, 40px)` }}>
        {grid.flat().map((cell, index) => {
          const row = Math.floor(index / numCols);
          const col = index % numCols;
          const clueNumber = clueNumbers[`${row}-${col}`];

          let isCorrect = false;
          Object.values(clues.across).forEach(clue => {
            if (clue.isCorrect && row === clue.row && col >= clue.col && col < clue.col + clue.answer.length) {
              isCorrect = true;
            }
          });
          Object.values(clues.down).forEach(clue => {
            if (clue.isCorrect && col === clue.col && row >= clue.row && row < clue.row + clue.answer.length) {
              isCorrect = true;
            }
          });

          return (
            <div key={`${row}-${col}`} className={`cell ${isCorrect ? 'correct' : ''} ${cell === 0 ? 'blocked' : ''}`}>
              {clueNumber && <span className="clue-number">{clueNumber}</span>}
              {cell !== 0 && (
                <input
                  type="text"
                  maxLength="1"
                  value={grid[row][col]}
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
          {Object.entries(clues.across).map(([number, { clue }]) => (
            <div key={number}>{`${number}. ${clue}`}</div>
          ))}
        </div>
        <div className="down">
          <h3>Down</h3>
          {Object.entries(clues.down).map(([number, { clue }]) => (
            <div key={number}>{`${number}. ${clue}`}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Crossword;
