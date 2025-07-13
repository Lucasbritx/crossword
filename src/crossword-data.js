export const crosswordData = {
  grid: [
    ['R', '', 'A', '', 'T'],
    [0, 0, '', '', ''],
    [0, 0, '', '', ''],
    [0, 0, '', 0, 0],
    ['C', '', '', 0, 0],
  ],
  clues: {
    across: {
      1: {
        clue: 'A popular JavaScript library for building user interfaces.',
        answer: 'REACT',
        row: 0,
        col: 0,
      },
      3: {
        clue: 'A road vehicle, typically with four wheels.',
        answer: 'CAR',
        row: 4,
        col: 0,
      },
    },
    down: {
      2: {
        clue: 'A person who performs in a play or movie.',
        answer: 'ACTOR',
        row: 0,
        col: 2,
      },
      4: {
        clue: 'Abbreviation for Tuesday.',
        answer: 'TUE',
        row: 0,
        col: 4,
      },
    },
  },
};
