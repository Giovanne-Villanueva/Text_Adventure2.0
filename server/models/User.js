const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
    stories: {
        type: Schema.Types.ObjectId,
        ref: 'story'
    },
    equipment: [
      {
        type: Schema.Types.ObjectId,
        ref:'equipment'
      }
    ],
    characters:{
      type: Schema.Types.ObjectId,
      ref: 'character'
    },
    user_stats: {
      type:Schema.Types.ObjectId,
      ref:'stats'
    }
    
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;