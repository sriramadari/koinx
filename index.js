require('dotenv').config()

const express = require('express');
const db = require('./config/mongoose');
const cron = require('node-cron');
const fetchCryptoData = require('./services/fetchCryptoData');
const PORT = process.env.PORT || 4000;
const cryptoRoutes = require('./routes/crypto');

const app = express();
app.use(express.json());


// This cron job fetches crypto data from coingecko api for every 2 hours
cron.schedule('0 */2 * * *', async () => {
    try {
      console.log('Cron job started: Fetching crypto data');
      await fetchCryptoData();
      console.log('Cron job completed: Crypto data fetched successfully');
    } catch (error) {
      console.error('Cron job failed: Error fetching crypto data', error);
    }
});

app.get('/', (req, res) => {
    return res.send(
      'server on duty ... 🚀'
    );
  });

app.use('/api', cryptoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
