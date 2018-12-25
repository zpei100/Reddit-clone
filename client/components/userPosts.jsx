import React from 'react';
import { Query } from 'react-apollo';
import { USER_POSTS } from '../queries/queries.js';
import { Username, Title, Popularity, PostWrapper, PostBody, Message, PostHeader } from './custom-tags/post-components.jsx';

export default function({username, handleTitleClick}) {
  return (
    <Query query={USER_POSTS} variables={{username}} pollInterval={500}>
      {({ loading, data }) => {
        if (loading) return '';
        if (data.user.posts) {

        return (
          data.user.posts.map(post => {
            const {postId, title, message} = post;
            return (
              <PostWrapper>
                <Popularity />
                <PostBody>
                  <React.Fragment>
                    <PostHeader>
                      <Username username={username}/>
                    </PostHeader>
                    <Title postId={postId} title={title} handleTitleClick={handleTitleClick}/>
                    <Message message={message} />
                    <hr className="mr-3" />
                  </React.Fragment>
                </PostBody>
              </PostWrapper>
          )})
        )
      }}}
    </Query>
  )
}

