const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    createdAt: String
    firstName: String
    lastName: String
    username: String
    email: String
    quizCount: Int
    quiz: [Quiz]
  }

  type Quiz {
    _id: ID!
    quizTitle: String
    quizSummary: String
    createdAt: String
    username: String
    questions: [Question]
  }

  type Question {
    _id: ID!
    questionText: String
    answers: [Answer]
  }
  type Answer {
    _id: ID!
    answerText: String
    answers: [Answer]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    quizzes: [Quiz]

  }

  type Mutation {  
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
      username: String!
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
      about: String
    ): User
    login(
    email: String!
    password: String!): Auth
    
    addQuiz(
      quizTitle: String!
      quizSummary: String!
    ): Quiz

    updateQuiz(
    quizTitle: String
    quizSummary: String): Quiz

    removeQuiz(
    quizID: ID!): Quiz


  }
`;

module.exports = typeDefs;
