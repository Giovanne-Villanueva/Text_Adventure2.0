const mongoose = require('mongoose');
const choice = require('./Choice')
const { Schema } = mongoose;

const storySchema = new Schema(
  {
    tale: {
      type: String,
      required: true
    },
    choices: [ choice.schema ],
    next_tale: [
      {
        type: Schema.Types.ObjectId,
        ref: 'story'
      }
    ]
  }
);

const Story = mongoose.model('story', storySchema);

module.exports = Story;