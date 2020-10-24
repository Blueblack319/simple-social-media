import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid } from "semantic-ui-react";

import "./Home.css";
import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const { userData } = useContext(AuthContext);

  return (
    <div className='home'>
      <Grid columns={3} divided>
        <Grid.Row className='home__title'>
          <h1>Recent Posts</h1>
        </Grid.Row>

        <Grid.Row>
          {userData && <Grid.Column>{<PostForm />}</Grid.Column>}
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            data.getPosts.map((post) => (
              <Grid.Column key={post.id}>
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
