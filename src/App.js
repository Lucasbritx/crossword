import React, { useState, useEffect } from 'react';
import './App.css';
import Crossword from './components/Crossword';
import { generateCrossword } from './crossword-generator';

function App() {
  const [crosswordData, setCrosswordData] = useState(null);

  const handleGenerateCrossword = () => {
    setCrosswordData(generateCrossword());
  }

  useEffect(() => {
    handleGenerateCrossword();
  }, []);

  return (
    <div className="App">
      <h1>Crossword Game</h1>
      {crosswordData && <Crossword data={crosswordData} onFinished={handleGenerateCrossword} />}
    </div>
  );
}

export default App;
