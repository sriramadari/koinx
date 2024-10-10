const express = require('express');
const Crypto = require('../models/Crypto');
const router = express.Router();
const calculateDeviation = require("../util/deviation.js")

router.get('/stats', async (req, res) => {
    const { coin } = req.query;
  
    if (!coin) {
      return res.status(400).json({ error: 'Coin is required' });
    }
  
    try {
      const cryptoData = await Crypto.findOne({ coin })
        .sort({ date: -1 }) 
        .limit(1); 
  
      if (!cryptoData) {
        return res.status(404).json({ error: 'Data not found for the specified coin' });
      }
  
      const latestPrice = cryptoData.prices[cryptoData.prices.length - 1];
      const latestMarketCap = cryptoData.marketCaps[cryptoData.marketCaps.length - 1];
      const latestChange24h = cryptoData.changes24h[cryptoData.changes24h.length - 1];
  
      res.json({
        price: latestPrice,
        marketCap: latestMarketCap,
        '24hChange': latestChange24h
      });


    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });


  router.get('/deviation', async (req, res) => {
    const { coin } = req.query;
  
    if (!coin) {
      return res.status(400).json({ error: 'Coin name is required' });
    }
  
    try {

      const recentRecords = await Crypto.find({ coin })
        .sort({ date: -1 }) 
        .limit(10); 


      if (recentRecords.length === 0) {
        return res.status(404).json({ error: 'No records found for the requested coin' });
      }

      const prices = recentRecords.flatMap(record => record.prices.reverse());

  
      // Get the last 100 prices for the calculation
      const last100Prices = prices.slice(-100); 


      if (last100Prices.length < 2) {
        return res.status(400).json({ error: 'Not enough data points to calculate deviation' });
      }
  
      const deviation = calculateDeviation(last100Prices);
  
      res.status(200).json({ deviation });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Server error' });
    }
  });


module.exports = router;
