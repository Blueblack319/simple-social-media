import { ApolloServer, gql } from "apollo-server";
import dotenv from "dotenv";
import mongoose from "mongoose";

import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";

dotenv.config();

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
