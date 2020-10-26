import React, { useContext, useState, useRef } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  Card,
  Grid,
  Image,
  Button,
  Icon,
  Label,
  Form,
} from "semantic-ui-react";
import moment from "moment";

import LikeButton from "./LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "./DeleteButton";

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
        body
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

const SUBMIT_COMMENT_MUTATION = gql`
  mutation CreateComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
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

const SinglePost = (props) => {
  const { userData } = useContext(AuthContext);
  const postId = props.match.params.postId;
  const [comment, setComment] = useState("");
  const commentInputRef = useRef(null);

  const handleInputUpdated = (event) => {
    setComment(event.target.value);
  };

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    variables: { postId, body: comment },
    update: () => {
      commentInputRef.current.blur();
      setComment("");
    },
  });

  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const deletePostCallback = () => {
    props.history.push("/");
  };

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
    } = data.getPost; // 여기에 적은것은 return되어서 나온다.

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
              size='massive'
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
                  <DeleteButton postId={id} callback={deletePostCallback} />
                </Card.Content>
              </Card.Content>
            </Card>
            {userData && (
              <Card fluid>
                <Card.Content>
                  <h3>Submit a comment</h3>
                  <Form>
                    <div className='ui input fluid'>
                      <input
                        type='text'
                        placeholder='Comment...'
                        name='comment'
                        value={comment}
                        onChange={handleInputUpdated}
                        ref={commentInputRef}
                      />
                      <Button
                        type='submit'
                        color='teal'
                        disabled={comment.trim() === ""}
                        onClick={submitComment}>
                        Submit
                      </Button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments &&
              comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {userData && userData.userName === comment.userName && (
                      <DeleteButton postId={id} commentId={comment.id} />
                    )}
                    <Card.Header>{comment.userName}</Card.Header>
                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
};

export default SinglePost;
