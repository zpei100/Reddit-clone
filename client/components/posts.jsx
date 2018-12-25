import React from 'react';
import { Query } from 'react-apollo';
import { GET_POSTS } from '../queries/queries.js';
import { Username, Content, Popularity, PostWrapper, PostBody } from './custom-tags/post-components.jsx';

export default function({ parentId, handleUsernameClick, handleTitleClick}) {
  return ( 
    <Query query={GET_POSTS} variables={{ parentId }} pollInterval={500}>
      {({ data, loading }) => {
        if (loading) return '';
        return data.posts.map(({ user: { username }, postId, title }) => {
          return (
            <PostWrapper key={postId}>
              <Popularity />
              <PostBody>
                <Username username={username} handleUsernameClick={handleUsernameClick} />
                <hr />
                <Content title={title} handleTitleClick={handleTitleClick} postId={postId} />
              </PostBody>
            </PostWrapper>
          )
        });
      }}
    </Query>
  );
}