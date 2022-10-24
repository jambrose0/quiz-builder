const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    quizCount: Int
    quiz: [Quiz]
  }

  type Quiz {
    _id: ID!
    quizTitle: String
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
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    addFriend(friendId: ID!): User
  }
`;

module.exports = typeDefs;
