import React from 'react';
import { Query } from 'react-apollo';
import { GET_POSTS } from '../queries/queries.js';

export default function() {
  return (
    <Query query={GET_POSTS}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        return (
          
            <ul className="col-sm-6 m-auto">
              {data.posts.map(post => (
                <div
                  className="container border border-dark my-3"
                  key={post.postId}
                >
                  <div className="text-secondary mb-2">{post.user}</div>
                  <h3 className="font-weight-bold my-2">{post.title}</h3>
                </div>
              ))}
            </ul>
       
        );
      }}
    </Query>
  )
}
