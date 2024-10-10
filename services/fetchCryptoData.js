const axios = require('axios');
const Crypto = require('../models/Crypto'); 

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';

const COINS = ['bitcoin', 'matic-network', 'ethereum'];


const fetchCryptoData = async () => {
  try {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 2);
        const nextDate = currentDate.toISOString().split('T')[0];

        const { data } = await axios.get(COINGECKO_API_URL, {
          params: {
            ids: COINS.join(','),
            vs_currencies: 'usd',
            include_market_cap: 'true',
            include_24hr_change: 'true'
          }
        });
    
        for (const coin of COINS) {
          const coinData = data[coin];
    
          if (coinData) {
            let cryptoRecord = await Crypto.findOne({ coin, date: nextDate });
    
            if (!cryptoRecord) {
              cryptoRecord = new Crypto({
                coin,
                date: nextDate,
                prices: [],
                marketCaps: [],
                changes24h: []
              });
            }
    
            cryptoRecord.prices.push(coinData.usd);
            cryptoRecord.marketCaps.push(coinData.usd_market_cap);
            cryptoRecord.changes24h.push(coinData.usd_24h_change);
    
            await cryptoRecord.save();
          }
        }
    console.log('Crypto data fetched and stored successfully');
  } catch (error) {
    console.error('Error fetching crypto data:', error.message);
    console.error('Error details:', error.response ? error.response.data : error);
  }
};

module.exports = fetchCryptoData;