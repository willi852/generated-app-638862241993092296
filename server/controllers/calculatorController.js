const express = require('express');
const router = express.Router();
const mathjs = require('mathjs');

// Evaluate mathematical expression
router.post('/evaluate', (req, res) => {
  try {
    const { expression } = req.body;
    const result = mathjs.evaluate(expression);
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: 'Invalid expression' });
  }
});

// Calculate scientific functions
router.post('/scientific', (req, res) => {
  try {
    const { func, value } = req.body;
    let result;
    
    switch(func) {
      case 'sin':
        result = mathjs.sin(value);
        break;
      case 'cos':
        result = mathjs.cos(value);
        break;
      case 'tan':
        result = mathjs.tan(value);
        break;
      case 'log':
        result = mathjs.log(value, 10);
        break;
      case 'ln':
        result = mathjs.log(value);
        break;
      case 'sqrt':
        result = mathjs.sqrt(value);
        break;
      case 'fact':
        result = mathjs.factorial(value);
        break;
      case 'pow':
        result = mathjs.pow(value[0], value[1]);
        break;
      default:
        throw new Error('Unknown function');
    }
    
    res.json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

### 4. No necesitamos modelos para esta aplicación simple, omitiremos este archivo

### 5. client/public/index.html