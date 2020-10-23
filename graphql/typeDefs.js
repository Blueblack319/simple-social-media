import { gql } from "apollo-server";

const typeDefs = gql`
  type Comment {
    id: ID!
    body: String!
    userName: String!
  }
  type Post {
    id: ID!
    body: String!
    userName: String!
    createdAt: String!
    comments: [Comment]!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    userName: String!
    createdAt: String!
  }
  input RegisterInput {
    userName: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(userName: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
  }
`;

export default typeDefs;
