const mongoose = require('mongoose');

const { Schema } = mongoose;

const choiceSchema = new Schema(
  {
    option: {
      type: String,
      required: true,
    },
    effect: {
      type: String,
      required: true
    },
    next_tale:{
      type: Schema.Types.ObjectId,
      ref: 'story'
    }
  }
);

const Choice = mongoose.model('choice', choiceSchema);

module.exports = Choice;