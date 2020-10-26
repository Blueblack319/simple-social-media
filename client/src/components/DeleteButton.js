import React, { useState, Fragment } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Icon, Confirm } from "semantic-ui-react";

import { FETCH_POSTS_QUERY } from "../utils/graphql";
import CustomPopup from "./CustomPopup";

const DELETE_POST_MUTATION = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      commentsCount
      comments {
        id
        body
        userName
        createdAt
      }
    }
  }
`;

const DeleteButton = ({ postId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deletePostOrComment] = useMutation(mutation, {
    variables: { postId, commentId },
    update: (proxy, result) => {
      setConfirmOpen(false); // Q. Why did delete comment automatically change cache??
      if (!commentId) {
        const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
        const getPosts = data.getPosts;
        const posts = getPosts.filter((post) => {
          return post.id !== postId;
        });
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: { getPosts: [...posts] },
        });
        if (callback) callback();
      }
    },
  });

  const handleConfirmClosed = () => {
    setConfirmOpen(false);
  };

  const handleConfirmOpened = () => {
    setConfirmOpen(true);
  };

  return (
    <Fragment>
      <CustomPopup content={commentId ? "Delete Comment" : "Delete Post"}>
        <Button
          as='div'
          floated='right'
          color='red'
          onClick={handleConfirmOpened}>
          <Icon name='trash' style={{ margin: "0" }} />
        </Button>
      </CustomPopup>
      <Confirm
        open={confirmOpen}
        onCancel={handleConfirmClosed}
        onConfirm={deletePostOrComment}
      />
    </Fragment>
  );
};

export default DeleteButton;
