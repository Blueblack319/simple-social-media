import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid } from "semantic-ui-react";

import "./Home.css";
import PostCard from "../components/PostCard";

const FETCH_POSTS_QUERY = gql`
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

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <div className='home'>
      <Grid columns={3} divided>
        <Grid.Row className='home__title'>
          <h1>Recent Posts</h1>
        </Grid.Row>

        <Grid.Row>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            data.getPosts.map((post) => (
              <Grid.Column>
                <PostCard post={post} />
              </Grid.Column>
            ))
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;
