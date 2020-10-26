import React, { useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { Card, Grid, Image, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";

import LikeButton from "./LikeButton";
import { AuthContext } from "../context/auth";

const FETCH_POST_QUERY = gql`
  query GetPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      userName
      createdAt
      commentsCount
      comments {
        id
        userName
        createdAt
      }
      likesCount
      likes {
        userName
      }
    }
  }
`;

const SinglePost = (props) => {
  const { userData } = useContext(AuthContext);
  const postId = props.match.params.postId;
  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  let postMarkup;
  if (loading) {
    postMarkup = <p>Loading...</p>;
  } else {
    const {
      id,
      body,
      userName,
      createdAt,
      commentsCount,
      comments,
      likesCount,
      likes,
    } = data.getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
              size='small'
              floated='right'
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{userName}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
                <h1 />
                <Card.Content extra>
                  <LikeButton
                    userData={userData}
                    post={{ id, likes, likesCount }}
                  />
                  <Button as='div' labelPosition='right'>
                    <Button color='blue' basic>
                      <Icon name='comments' />
                    </Button>
                    <Label basic color='blue' pointing='left'>
                      {commentsCount}
                    </Label>
                  </Button>
                </Card.Content>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return <div></div>;
};

export default SinglePost;
