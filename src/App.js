import React from 'react';
import './App.css';
import Crossword from './components/Crossword';
import { crosswordData } from './crossword-data';

function App() {
  return (
    <div className="App">
      <h1>Crossword Game</h1>
      <Crossword data={crosswordData} />
    </div>
  );
}

export default App;
