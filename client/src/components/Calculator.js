import React, { useState } from 'react';
import '../styles/App.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('0');
  const [lastOperation, setLastOperation] = useState('');
  const [scientificMode, setScientificMode] = useState(false);

  const handleClick = (value) => {
    if (value === 'AC') {
      setInput('');
      setResult('0');
      setLastOperation('');
      return;
    }

    if (value === '⌫') {
      setInput(input.slice(0, -1));
      return;
    }

    if (value === '=') {
      try {
        if (!input.trim()) return;
        
        // Make a POST request to our backend
        fetch('/api/calculator/evaluate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ expression: input }),
        })
          .then(response => response.json())
          .then(data => {
            setResult(data.result.toString());
            setLastOperation(input);
            setInput('');
          })
          .catch(error => {
            console.error('Error:', error);
            setResult('Error');
          });
      } catch (error) {
        setResult('Error');
      }
      return;
    }

    setInput(input + value);
  };

  const handleScientificFunction = (func) => {
    if (!input && !result) return;
    
    const valueToUse = input || result;
    const currentValue = parseFloat(valueToUse);

    // Make a POST request for scientific functions
    fetch('/api/calculator/scientific', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ func, value: currentValue }),
    })
      .then(response => response.json())
      .then(data => {
        setResult(data.result.toString());
        setLastOperation(`${func}(${currentValue})`);
        setInput('');
      })
      .catch(error => {
        console.error('Error:', error);
        setResult('Error');
      });
  };

  // Basic buttons
  const basicButtons = [
    ['AC', '⌫', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  // Scientific buttons
  const scientificButtons = [
    ['sin', 'cos', 'tan'],
    ['log', 'ln', 'sqrt'],
    ['(', ')', '^'],
    ['π', 'e', '!'],
  ];

  return (
    <div className="calculator">
      <div className="display">
        <div className="last-operation">{lastOperation}</div>
        <div className="current-input">{input || '0'}</div>
        <div className="result">{result}</div>
      </div>
      
      <div className="toggle-mode">
        <button onClick={() => setScientificMode(!scientificMode)}>
          {scientificMode ? 'Basic' : 'Scientific'}
        </button>
      </div>
      
      <div className="buttons-grid">
        {basicButtons.map((row, rowIndex) => (
          <div key={rowIndex} className="button-row">
            {row.map((btn) => (
              <button 
                key={btn}
                onClick={() => handleClick(btn)}
                className={`button ${btn === '=' ? 'equals' : ''}`}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>

      {scientificMode && (
        <div className="scientific-buttons">
          {scientificButtons.map((row, rowIndex) => (
            <div key={`sci-${rowIndex}`} className="button-row">
              {row.map((btn) => (
                <button
                  key={`sci-${btn}`}
                  onClick={() => {
                    if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', '!'].includes(btn)) {
                      handleScientificFunction(btn);
                    } else if (btn === '^') {
                      handleClick('^');
                    } else if (btn === 'π') {
                      handleClick(Math.PI.toString());
                    } else if (btn === 'e') {
                      handleClick(Math.E.toString());
                    } else {
                      handleClick(btn);
                    }
                  }}
                  className="button scientific"
                >
                  {btn}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calculator;

### 9. client/src/styles/App.css