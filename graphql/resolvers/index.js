import postResolvers from "./posts";
import userResolvers from "./users";
import commentResolvers from "./comments";

const resolvers = {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
};

export default resolvers;
