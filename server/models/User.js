const dateFormat = require('../utils/dateFormat')
const bcrypt = require('bcrypt');
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat
      (timestamp),
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },
    quizzes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Quiz'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
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
  return bcrypt.compare(password, this.password);
};



const User = model('User', userSchema);

module.exports = User;
