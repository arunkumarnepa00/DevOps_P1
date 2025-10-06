const express = require('express');
const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).send('Hello, World!');
});

app.get('/api/users', (req, res) => {
  res.status(200).json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]);
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

module.exports = app;
