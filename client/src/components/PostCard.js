import React, { useContext } from "react";
import { Card, Image, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";
import CustomPopup from "./CustomPopup";

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

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
        />
        <Card.Header>{userName}</Card.Header>
        <CustomPopup content='Go to Post'>
          <Card.Meta as={Link} to={`/posts/${id}`}>
            {moment(createAt).fromNow(true)}
          </Card.Meta>
        </CustomPopup>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as='div' labelPosition='right' onClick={handleLikesClicked}>
          <LikeButton userData={userData} post={{ id, likes, likesCount }} />
        </Button>
        <CustomPopup content='Coment on Post'>
          <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
            <Button basic color='blue'>
              <Icon name='comment' />
            </Button>
            <Label as='div' basic color='blue' pointing='left'>
              {commentsCount}
            </Label>
          </Button>
        </CustomPopup>
        {userData && userData.userName === userName && (
          <DeleteButton postId={id} />
        )}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
