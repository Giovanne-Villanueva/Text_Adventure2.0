const mongoose = require('mongoose');

const { Schema } = mongoose;

const statsSchema = new Schema({

  hp: {
    type: Number,
    required: true,
  },
  attack: {
    type: Number,
    required: true,
  },
  defense: {
    type: Number,
    required: true,
  },
  agility: {
    type: Number,
    required: true,
  },

});

const Stats = mongoose.model('stats', statsSchema);

module.exports = Stats;