import React from "react";
import { Card, Image, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

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
  const handleLikesClicked = () => {
    console.log("Likes");
  };
  const handleCommentsClicked = () => {
    console.log("Comments");
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
        <div className='ui two buttons'>
          <Button as='div' labelPosition='right' onClick={handleLikesClicked}>
            <Button color='teal'>
              <Icon name='heart' />
              Likes
            </Button>
            <Label as='a' basic color='teal' pointing='left'>
              {likesCount}
            </Label>
          </Button>
          <Button
            as='div'
            labelPosition='right'
            onClick={handleCommentsClicked}>
            <Button basic color='blue'>
              <Icon name='comment' />
              Comments
            </Button>
            <Label as='a' basic color='blue' pointing='left'>
              {commentsCount}
            </Label>
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
