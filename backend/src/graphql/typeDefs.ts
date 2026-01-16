import { gql } from "apollo-server-express"

export const typeDefs = gql`
 type User {
    _id: ID!
    name: String!
    email: String!
    avatar: String
    createdAt: String
  }
  type Query {
    users: [User!]!
    user(id: ID!): User
  }
`

