import React from 'react';
import { Query } from 'react-apollo';
import { GET_POST, DELETE_POST } from '../queries/queries.js';
import { Mutation } from 'react-apollo';
import $ from 'jquery';

class Comments extends React.Component {

  constructor() {
    super();
    this.state = {
      edit: false
    }

  this.editPost = this.editPost.bind(this);
  }

  editPost (title, message, postId) {
    this.setState({edit: !this.state.edit}, () => {
      console.log('this props: ', this.props)
      if (this.state.edit) {
        $('.edit').css('display','none');
        $('#title').val(title);
        $('#message').val(message);
        this.props.changePostComponent('Save Changes', postId);
      } else {
        $('.edit').css('display','default');
        $('#title').val('');
        $('#message').val('');
        this.props.changePostComponent('Post', null);
      }
    })
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('previous state edit: ', prevState.edit)
    if (prevProps.postBeingEdited !== null && this.state.edit) this.setState({edit: false})
  }

  render () {
    const { parentId, comment, username, setHeight, updateMaster, goToMain, postBeingEdited, changePostComponent } = this.props;

    return (
      <Query query={GET_POST} variables={{ postId: parentId }} pollInterval={500}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          if (data.post) {
            console.log('data is : ', data)
          return (
            <div style={{width: '100%'}}>
              <div className="container border border-dark my-3 w-100">
                <div className="text-secondary mt-3 d-flex justify-content-between">
                  <div><a href="#" onClick={() => {
                    updateMaster(data.post.user.username);
                  }}>{data.post.user.username}</a>
                  </div>

                  <div className="row">
                    {username === data.post.user.username 
                    ? <div>
                        <button
                          className={`btn btn-outline-${this.state.edit === false ? 'info' : 'danger'} mx-2 ${this.state.edit === false ? 'edit' : 'cancel'}`}
                          onClick={() => {this.editPost(data.post.title, data.post.message, data.post.postId)}}
                        >
                          {this.state.edit === false ? 'Edit' : 'Cancel'}
                        </button>
                        
                        <Mutation mutation={DELETE_POST}>
                          {(deletePost) => (
                              <button className="btn btn-outline-danger mx-2" onClick={() => {
                                if(data.post.parentId === 'main') goToMain();
                                deletePost({variables: {postId: data.post.postId}
                              })}}>Delete</button>
                            )
                          }
                        </Mutation>
                      </div>
                    : ''}




                    {username === '' ? (
                      ''
                    ) : (
                      <button
                        className="btn btn-outline-primary mx-2"
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
                </div>

                <h3 className={`font-wight-bold mt-0 ${data.post.postId}`} >{data.post.title}</h3>
                <hr />
                <p className={data.post.postId}>{data.post.message}</p>
                <ul style={{ width: '100%' }}>
                  {data.post.comments.length > 0 ? data.post.comments.map(post => (
                    <Comments 
                    key={post.postId} 
                    updateMaster={updateMaster} 
                    parentId={post.postId} 
                    username={username} 
                    comment={comment} 
                    setHeight={setHeight}
                    changePostComponent={changePostComponent}
                    goToMain={goToMain}
                    postBeingEdited={postBeingEdited}
                  />
                  )) : ''}
                </ul>
              </div>
            </div>
          );
        } else {
          return ''
        }}}
      </Query>
    )
  };
}

export default Comments;