import React, { useState, Fragment } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Icon, Confirm } from "semantic-ui-react";

import { FETCH_POSTS_QUERY } from "../utils/graphql";

const DELETE_POST_MUTATION = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DeleteButton = ({ postId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: { postId },
    update: (proxy, result) => {
      setConfirmOpen(false);
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      const getPosts = data.getPosts;
      const posts = getPosts.filter((post) => {
        return post.id != postId;
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [...posts] },
      });
      if (callback) callback();
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
      <Button
        as='div'
        floated='right'
        color='red'
        onClick={handleConfirmOpened}>
        <Icon name='trash' style={{ margin: "0" }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={handleConfirmClosed}
        onConfirm={deletePost}
      />
    </Fragment>
  );
};

export default DeleteButton;
