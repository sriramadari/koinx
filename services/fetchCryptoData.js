const axios = require('axios');
const Crypto = require('../models/Crypto'); 

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';

const COINS = ['bitcoin', 'ethereum', 'litecoin']; 


const fetchCryptoData = async () => {
  try {

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
        await Crypto.create({
          coin,
          price: coinData.usd,
          marketCap: coinData.usd_market_cap,
          change24h: coinData.usd_24h_change
        });
      } else {
        console.warn(`No data found for coin: ${coin}`);
      }
    }
    console.log('Crypto data fetched and stored successfully');
  } catch (error) {
    console.error('Error fetching crypto data:', error.message);
    console.error('Error details:', error.response ? error.response.data : error);
  }
};

module.exports = fetchCryptoData;