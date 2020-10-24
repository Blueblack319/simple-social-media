import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      userName
      createdAt
      commentsCount
      comments {
        body
        userName
        createdAt
      }
      likesCount
      likes {
        userName
        createdAt
      }
    }
  }
`;
