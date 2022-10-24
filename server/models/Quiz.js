const { Schema, model } = require('mongoose');
const questionSchema = require('./Question');
const dateFormat = require('../utils/dateFormat');

const quizSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'You need to title the quiz!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    questions: [questionSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

quizSchema.virtual('questionCount').get(function() {
  return this.questions.length;
});

const Quiz = model('Quiz', quizSchema);

module.exports = Quiz;
