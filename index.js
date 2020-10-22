import { ApolloServer, gql } from "apollo-server";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => "Hello World!!!",
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
