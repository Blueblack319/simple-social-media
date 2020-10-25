import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";

import "./LikeButton.css";

// automatically change cache => Furthermore study!
const LIKE_POST_MUTATION = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likesCount
      likes {
        id
        userName
      }
    }
  }
`;

const LikeButton = ({ userData, post: { id, likes, likesCount } }) => {
  const [liked, setLiked] = useState(false);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  useEffect(() => {
    if (userData && likes.find((like) => like.userName === userData.userName)) {
      setLiked(true);
    } else setLiked(false);
  }, [likes, userData]);

  const likeButton = userData ? (
    liked ? (
      <Button color='teal'>
        <Icon name='heart' />
      </Button>
    ) : (
      <Button color='teal' basic>
        <Icon name='heart' />
      </Button>
    )
  ) : (
    <Button color='teal' basic as={Link} to='login'>
      <Icon name='heart' />
    </Button>
  );

  return (
    <Button as='div' labelPosition='right' onClick={likePost}>
      {likeButton}
      <Label as='a' basic color='teal' pointing='left'>
        {likesCount}
      </Label>
    </Button>
  );
};

export default LikeButton;
