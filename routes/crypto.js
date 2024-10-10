const express = require('express');
const Crypto = require('../models/Crypto');
const router = express.Router();

router.get('/stats', async (req, res) => {
  const { coin } = req.query;

  try {
    const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });

    if (!latestData) {
      return res.status(404).json({ error: 'Data not found' });
    }

    res.status(200).json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      '24hChange': latestData.change24h
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
