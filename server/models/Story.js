const mongoose = require('mongoose');
const { Schema } = mongoose;

const storySchema = new Schema(
  {
    tale: {
      type: String,
      required: true
    },
    choices: [ 
      {
        type: Schema.Types.ObjectId,
        ref: 'choice'
      } 
    ],
    first:{
      type:Boolean,
      default: false
    }
  }
);

const Story = mongoose.model('story', storySchema);

module.exports = Story;