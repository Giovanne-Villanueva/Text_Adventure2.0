const mongoose = require('mongoose');

const { Schema } = mongoose;

const equipmentSchema = new Schema({

  equipment_name: {
    type: String,
    required: true,
    trim: true
  },
  ability: {
    type: String,
    required: true
  },
  eq_stats: {
    type: Schema.Types.ObjectId,
     ref: 'stats'
  }

});

const Equipment = mongoose.model('equipment', equipmentSchema);

module.exports = Equipment;