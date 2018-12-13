import React from 'react';
import { Query } from 'react-apollo';
import { USER_POSTS } from '../queries/queries.js';

export default function({username, comment, updateMaster, updateParentId}) {
  return (
    <Query query={USER_POSTS} variables={{username}} pollInterval={500}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        return (
          <ul className="m-auto">
            {data.user.posts.map(post => (
              <div
                className="container border border-dark my-3"
                key={post.postId}
              >
                <div className="text-secondary mt-3"><a href="#" onClick={() => {
                  updateMaster(post.user.username);
                }}>{post.user.username}</a></div>
                <hr></hr>
                <h3 className="font-weight-bold mt-0"><a href="#" onClick={() => {
                  updateParentId(post.postId);
                  comment(post.postId);
                }}>{post.title}</a></h3>
              </div>
            ))}
          </ul>
       
        );
      }}
    </Query>
  )
}

