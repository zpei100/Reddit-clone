import React from 'react';
import { Query } from 'react-apollo';
import { GET_POSTS } from '../queries/queries.js';

export default function({parentId, updateParentId, updateMaster, comment}) {
  return (
    <Query query={GET_POSTS} variables={{parentId}} pollInterval={500}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        return (
          <ul className="m-auto">
            {data.posts.map(({postId, user: {username}, title}) => (
              <div className="d-flex rounded border-dark my-3 p-0 h-100 post" key={postId}>
                <div className="post-popularity">

                </div>

                <div className="post-body mx-3">
                  <div className="mt-3 post-username"><a href="#" onClick={() => {
                    updateMaster(username);
                  }}>{username}</a></div>

                  <hr></hr>

                  <div>
                    <h3 className="mt-0 post-title"><a href="#" onClick={() => {
                      updateParentId(postId);
                      comment(postId);
                    }}>{title}</a></h3>

                    <div className="post-icons">

                    </div>
                  </div>
                </div>

              </div>
            ))}
          </ul>
       
        );
      }}
    </Query>
  )
}

