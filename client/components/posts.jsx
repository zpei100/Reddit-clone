import React from 'react';
import { Query } from 'react-apollo';
import { GET_POSTS } from '../queries/queries.js';
import { Post } from './custom-tags/post-components.jsx';

export default function({ parentId, handleUsernameClick, updateParentId, comment }) {
  return (
    <Query query={GET_POSTS} variables={{ parentId }} pollInterval={500}>
      {({ data, loading }) => {
        if (loading) return <h1>Loading...</h1>;
        return data.posts.map(({ user: { username }, postId, title }) => (
          <Post
            handleUsernameClick={handleUsernameClick}
            username={username}
            postId={postId}
            title={title}
            handleTitleClick={postId => {
              updateParentId(postId);
              comment(postId);
            }}
          />
        ));
      }}
    </Query>
  );
}
