const express = require('express');
const Crypto = require('../models/Crypto');
const router = express.Router();

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


module.exports = router;
