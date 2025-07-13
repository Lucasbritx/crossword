const wordList = [
  { word: 'REACT', clue: 'A popular JavaScript library for building user interfaces.' },
  { word: 'ACTOR', clue: 'A person who performs in a play or movie.' },
  { word: 'CAR', clue: 'A road vehicle, typically with four wheels.' },
  { word: 'TUE', clue: 'Abbreviation for Tuesday.' },
  { word: 'API', clue: 'A set of functions and procedures for creating applications.' },
  { word: 'CSS', clue: 'A style sheet language for web pages.' },
  { word: 'HTML', clue: 'The standard markup language for web documents.' },
  { word: 'JAVA', clue: 'A high-level, object-oriented programming language.' },
];

const template = {
  grid: [
    ['', '', '', '', ''],
    [0, 0, '', '', ''],
    [0, 0, '', '', ''],
    [0, 0, '', 0, 0],
    ['', '', '', 0, 0],
  ],
  placements: [
    { direction: 'across', row: 0, col: 0, length: 5 },
    { direction: 'down', row: 0, col: 2, length: 3 },
    { direction: 'across', row: 4, col: 0, length: 3 },
    { direction: 'down', row: 0, col: 4, length: 3 },
  ],
};

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function canPlaceWord(grid, word, placement) {
  const { row, col, direction } = placement;
  if (direction === 'across') {
    for (let i = 0; i < word.length; i++) {
      if (grid[row][col + i] !== '' && grid[row][col + i] !== word[i]) {
        return false;
      }
    }
  } else {
    for (let i = 0; i < word.length; i++) {
      if (grid[row + i][col] !== '' && grid[row + i][col] !== word[i]) {
        return false;
      }
    }
  }
  return true;
}

function fillGrid(grid, placements, clues, words) {
  if (placements.length === 0) {
    return true;
  }

  const placement = placements[0];
  const remainingPlacements = placements.slice(1);
  const availableWords = words.filter(w => w.word.length === placement.length);

  shuffle(availableWords);

  for (const wordData of availableWords) {
    if (canPlaceWord(grid, wordData.word, placement)) {
      const newGrid = grid.map(row => [...row]);
      const newClues = { ...clues };
      const newWords = words.filter(w => w.word !== wordData.word);

      if (placement.direction === 'across') {
        for (let i = 0; i < wordData.word.length; i++) {
          newGrid[placement.row][placement.col + i] = wordData.word[i];
        }
      } else {
        for (let i = 0; i < wordData.word.length; i++) {
          newGrid[placement.row + i][placement.col] = wordData.word[i];
        }
      }

      newClues[placement.direction][Object.keys(newClues[placement.direction]).length + 1] = {
        clue: wordData.clue,
        answer: wordData.word,
        row: placement.row,
        col: placement.col,
        isCorrect: false,
      };

      if (fillGrid(newGrid, remainingPlacements, newClues, newWords)) {
        Object.assign(grid, newGrid);
        Object.assign(clues, newClues);
        return true;
      }
    }
  }

  return false;
}

export function generateCrossword() {
  const newGrid = template.grid.map(row => [...row]);
  const clues = { across: {}, down: {} };

  fillGrid(newGrid, template.placements, clues, wordList);

  const finalGrid = newGrid.map((row, r) => 
    row.map((cell, c) => {
      let isInitial = false;
      Object.values(clues.across).forEach(clue => {
        if (r === clue.row && c === clue.col) isInitial = true;
      });
      Object.values(clues.down).forEach(clue => {
        if (r === clue.row && c === clue.col) isInitial = true;
      });
      return isInitial ? cell : (cell === 0 ? 0 : '');
    })
  );

  return { grid: finalGrid, clues };
}