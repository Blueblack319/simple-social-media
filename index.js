import { ApolloServer, gql } from "apollo-server";
import mongoose from "mongoose";
import dotenv from "dotenv";

import Post from "./models/Post";

dotenv.config();

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    userName: String!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected ✅");
    return server.listen({ port: 5000 });
  })
  .then((res) => console.log(`Server running at ${res.url}`));
