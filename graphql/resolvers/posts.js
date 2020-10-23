import { UserInputError } from "apollo-server";
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
    deletePost: async (_, { postId }, context) => {
      const user = checkAuth(context);

      try {
        const post = await Post.findById(postId);
        if (user.userName === post.userName) {
          await post.deleteOne();
          return "Post deleted successfully";
        } else {
          throw new Error("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    likePost: async (_, { postId }, context) => {
      const { userName } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find((like) => like.userName === userName)) {
          // Post already liked, unlike post
          post.likes = post.likes.filter((like) => like.userName !== userName);
        } else {
          // Post unliked, like post
          post.likes.push({
            userName,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};

export default postResolvers;
