require('dotenv').config()

const express = require('express');
const db = require('./config/mongoose');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    return res.send(
      'server on duty ... 🚀'
    );
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
