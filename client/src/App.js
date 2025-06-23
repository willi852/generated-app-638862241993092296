import React, { useState, useEffect } from 'react';
import Calculator from './components/Calculator';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <h1 className="app-title">Scientific Calculator</h1>
      <Calculator />
    </div>
  );
}

export default App;

### 7. client/src/index.js