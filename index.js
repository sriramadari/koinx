require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB to connected')).catch(err => console.error(err));


const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    return res.send(
      'server on duty ...'
    );
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
