import React, { useContext } from "react";
import { Card, Image, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";

const PostCard = ({
  post: {
    id,
    body,
    userName,
    createAt,
    comments,
    likes,
    commentsCount,
    likesCount,
  },
}) => {
  const { userData } = useContext(AuthContext);

  const handleLikesClicked = () => {
    console.log("Likes");
  };
  const handlePostDeleted = () => {
    console.log("Post deleted");
  };

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
        />
        <Card.Header>{userName}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as='div' labelPosition='right' onClick={handleLikesClicked}>
          <LikeButton userData={userData} post={{ id, likes, likesCount }} />
        </Button>
        <Button labelPosition='right' as={Link} to={`/post/${id}`}>
          <Button basic color='blue'>
            <Icon name='comment' />
          </Button>
          <Label as='a' basic color='blue' pointing='left'>
            {commentsCount}
          </Label>
        </Button>
        {userData && userData.userName === userName && (
          <DeleteButton postId={id} />
        )}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
