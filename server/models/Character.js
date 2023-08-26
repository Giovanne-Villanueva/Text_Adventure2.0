const mongoose = require('mongoose');

const { Schema } = mongoose;

const characterSchema = new Schema({
  character_name: {
    type: String,
    required: true,
    trim: true
  },
  healthpoints: {
    type: Number
  },
  ch_stats: {
    type: Schema.Types.ObjectId,
    ref:'stats'
  },
  
})

const Character = mongoose.model('character', characterSchema);

module.exports = Character;