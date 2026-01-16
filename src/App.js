import React, { useState } from 'react';
import './App.css';

function App() {
  const [initialBalls, setInitialBalls] = useState('');
  const [boxes, setBoxes] = useState({
    A: { color: 'Violet', count: 0 },
    B: { color: 'Orange', count: 0 },
    C: { color: 'Green', count: 0 },
    D: { color: 'White', count: 0 }
  });
  const [choice, setChoice] = useState('');
  const [history, setHistory] = useState([]);

  const initializeBoxes = () => {
    const count = parseInt(initialBalls);
    if (isNaN(count) || count <= 0) {
      alert('Please enter a positive number');
      return;
    }

    const newBoxes = {};
    ['A', 'B', 'C', 'D'].forEach((box, index) => {
      newBoxes[box] = {
        color: box === 'A' ? 'Violet' : 
               box === 'B' ? 'Orange' : 
               box === 'C' ? 'Green' : 'White',
        count: count * Math.pow(2, index)
      };
    });

    setBoxes(newBoxes);
    setHistory([`Initialized: ${count} balls × powers of 2`]);
  };

  const handleChoice1 = () => {
    const newBoxes = { ...boxes };
    Object.keys(newBoxes).forEach(box => {
      newBoxes[box].count *= 2;
    });
    
    setBoxes(newBoxes);
    setHistory([...history, 'Choice 1: All boxes doubled']);
  };

  const handleChoice2 = () => {
    const newBoxes = { ...boxes };
    const boxesArray = ['A', 'B', 'C', 'D'];
    
    // Move consecutive boxes to last box
    let totalToMove = 0;
    boxesArray.forEach((box, index) => {
      if (index < boxesArray.length - 1) {
        totalToMove += newBoxes[box].count;
        newBoxes[box].count = 0;
      }
    });
    
    newBoxes['D'].count += totalToMove;
    
    setBoxes(newBoxes);
    setHistory([...history, 'Choice 2: Consecutive boxes emptied into last box']);
  };

  const handleChoice3 = () => {
    const newBoxes = { ...boxes };
    const boxesArray = ['A', 'B', 'C', 'D'];
    
    // Move odd boxes to even boxes
    const oddBalls = newBoxes['A'].count + newBoxes['C'].count;
    newBoxes['B'].count += newBoxes['A'].count;
    newBoxes['D'].count += newBoxes['C'].count;
    newBoxes['A'].count = 0;
    newBoxes['C'].count = 0;
    
    setBoxes(newBoxes);
    setHistory([...history, 'Choice 3: Odd boxes moved to even boxes']);
  };

  const handleChoice = () => {
    switch(choice) {
      case '1': handleChoice1(); break;
      case '2': handleChoice2(); break;
      case '3': handleChoice3(); break;
      default: alert('Please select a choice (1, 2, or 3)');
    }
  };

  const resetGame = () => {
    setBoxes({
      A: { color: 'Violet', count: 0 },
      B: { color: 'Orange', count: 0 },
      C: { color: 'Green', count: 0 },
      D: { color: 'White', count: 0 }
    });
    setInitialBalls('');
    setChoice('');
    setHistory([]);
  };

  return (
    <div
        className="App"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/program-bg.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
      <div className="container">
        <h1>4-Box Color Ball Game</h1>
        <div className="rules">
          <h3>Rules:</h3>
          <ul>
            <li>Box A: Violet balls</li>
            <li>Box B: Orange balls</li>
            <li>Box C: Green balls</li>
            <li>Box D: White balls</li>
            <li>Initial: User sets value × 2^box_index</li>
          </ul>
        </div>

        <div className="initialization">
          <div className="input-group">
            <input
              type="number"
              value={initialBalls}
              onChange={(e) => setInitialBalls(e.target.value)}
              placeholder="Enter initial ball count"
              min="1"
            />
            <button onClick={initializeBoxes} className="init-btn">
              Initialize Boxes
            </button>
          </div>
        </div>

        <div className="boxes-container">
          {Object.entries(boxes).map(([box, data]) => (
            <div key={box} className="box" style={{ 
              backgroundColor: data.color.toLowerCase(),
              borderColor: data.color
            }}>
              <div className="box-label">Box {box}</div>
              <div className="box-color">{data.color}</div>
              <div className="box-count">{data.count} balls</div>
            </div>
          ))}
        </div>

        <div className="choices-section">
          <h3>Choices:</h3>
          <div className="choice-buttons">
            <button onClick={() => setChoice('1')} className={choice === '1' ? 'active' : ''}>
              1. Double all boxes
            </button>
            <button onClick={() => setChoice('2')} className={choice === '2' ? 'active' : ''}>
              2. Empty consecutive → Last
            </button>
            <button onClick={() => setChoice('3')} className={choice === '3' ? 'active' : ''}>
              3. Odd → Even boxes
            </button>
          </div>
          
          <div className="execute-choice">
            <button onClick={handleChoice} className="execute-btn">
              Execute Choice {choice}
            </button>
          </div>
        </div>

        {history.length > 0 && (
          <div className="history-section">
            <h3>Operation History:</h3>
            <div className="history-list">
              {history.map((item, index) => (
                <div key={index} className="history-item">
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={resetGame} className="reset-btn">
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default App;