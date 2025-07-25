const express = require('express');
const app = express();
const port = 3000;


// Route handlers for different operations
app.get('/add', (req, res) => {
  const { a, b } = req.query;
  const sum = parseInt(a) + parseInt(b);
  res.send(`The sum of ${a} and ${b} is ${sum}`);
});

app.get('/multiply', (req, res) => {
  const { x, y } = req.query;
  const product = parseInt(x) * parseInt(y);
  res.send(`The product of ${x} and ${y} is ${product}`);
});

app.get('/divide', (req, res) => {
  const { num1, num2 } = req.query;
  if (parseInt(num2) === 0) {
    return res.status(400).send('Division by zero is not allowed');
  }
  const quotient = parseInt(num1) / parseInt(num2);
  res.send(`The quotient of ${num1} and ${num2} is ${quotient}`);
});

app.get('/subtract', (req, res) => {
  const { p, q } = req.query;
  const difference = parseInt(p) - parseInt(q);
  res.send(`The difference between ${p} and ${q} is ${difference}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});