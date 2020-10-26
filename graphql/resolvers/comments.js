import { AuthenticationError, UserInputError } from "apollo-server";

import checkAuth from "../../utils/check-auth";
import Post from "../../models/Post";

const commentResolvers = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { userName } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty body", {
          errors: {
            body: "Comment must not be empty",
          },
        });
      }
      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          userName,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const { userName } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex(
          (comment) => comment.id === commentId
        );
        if (post.comments[commentIndex].userName === userName) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};

export default commentResolvers;
