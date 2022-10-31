const { Schema, model } = require('mongoose');
const questionSchema = require('./Question');
const answerSchema = require('./Answer');
const dateFormat = require('../utils/dateFormat');

const quizSchema = new Schema(
  {
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    quizTitle: {
      type: String,
      required: 'You did not provide a title for your post!',
      minlength: 1,
      maxlength: 280
    },
    quizSummary: {
      type: String,
      required: 'You did not provide a description of your quiz!',
      minlength: 1,
      maxlength: 280
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
