const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    coin: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date,
        required: true 
    }, // Represents the day
    prices: [{ 
        type: Number, 
        required: true 
    }],
    marketCaps: [{ 
        type: Number, 
        required: true 
    }],
    changes24h: [{
        type: Number, 
        required: true 
    }]
});
  
cryptoSchema.index({ coin: 1, date: -1 }); // Index to quickly find latest data
  