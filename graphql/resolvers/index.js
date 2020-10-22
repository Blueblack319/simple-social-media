import postResolvers from "./posts";
import userResolvers from "./users";

const resolvers = {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};

export default resolvers;
