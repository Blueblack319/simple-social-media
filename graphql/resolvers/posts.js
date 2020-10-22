import Post from "../../models/Post";
import checkAuth from "../../utils/check-auth";

const postResolvers = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      } // Why do we have to try ... catch? => if not, Our server is broken entirely!!
    },
    getPost: async (_, { postId }) => {
      try {
        if (postId.match(/^[0-9a-fA-F]{24}$/)) {
          const post = await Post.findById(postId);
          if (post) {
            return post;
          } else {
            throw new Error("Post not found");
          }
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    createPost: async (_, { body }, context) => {
      const user = checkAuth(context);

      const newPost = new Post({
        body,
        user: user.id,
        userName: user.userName,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },
  },
};

export default postResolvers;
