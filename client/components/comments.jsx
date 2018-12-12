import React from 'react';
import { Query } from 'react-apollo';
import { GET_POST } from '../queries/queries.js';
import $ from 'jquery';

const Comments = function({ parentId, comment, username, setHeight }) {
  return (
    <Query query={GET_POST} variables={{ postId: parentId }} pollInterval={500}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        if (data) console.log(data);
        return (
          <div style={{width: '100%'}}>
            <div className="container border border-dark my-3 w-100">
              <div className="text-secondary mt-3 d-flex justify-content-between">
                <div>{data.post.user.username}</div>
                {username === '' ? (
                  ''
                ) : (
                  <button
                    className="btn btn-outline-primary"
                    onClick={function(e) {
                      const postId = data.post.postId;
                      comment(postId);
                      $(e.target).hover();
                      const height = e.target.offsetTop - 18;
                      setHeight(height);
                    }}
                  >
                    Comment
                  </button>
                )}
              </div>
              <hr />
              <h3 className="font-wight-bold mt-0">{data.post.title}</h3>
              <ul style={{ width: '100%' }}>
                {data.post.comments.map(post => (
                  <Comments parentId={post.postId} username={username} comment={comment} setHeight={setHeight}/>
                ))}
              </ul>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Comments;

// const something = <ul>
// {data.posts.map(post => (
//   <div
//     className="container border border-dark my-3"
//     key={post.postId}
//   >
//     <div className="text-secondary mt-3">{post.user.username}</div>
//     <hr></hr>
//     <h3 className="font-weight-bold mt-0">{post.title}</h3>
//   </div>
// ))}
// </ul>
