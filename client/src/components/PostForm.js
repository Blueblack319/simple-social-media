import React from "react";
import { Form, Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

import { useForm } from "../utils/hooks";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
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
        id
        userName
        createdAt
      }
    }
  }
`;

const PostForm = () => {
  const {
    values,
    handleInputChanged,
    handleFormSubmitted,
  } = useForm(createPostCallback, { body: "" });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update: (proxy, result) => {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Form onSubmit={handleFormSubmitted}>
      <h2>Create a Post: </h2>
      <Form.Field>
        <Form.Input
          placeholder='Simple SM'
          name='body'
          value={values.body}
          onChange={handleInputChanged}
        />
        <Button type='submit' color='teal'>
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
};

export default PostForm;
