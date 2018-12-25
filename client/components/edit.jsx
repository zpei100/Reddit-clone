import React from 'react';
import { Mutation } from 'react-apollo';
import { UPDATE_POST, DELETE_POST } from '../queries/queries.js';

export default class Edit extends React.Component {
  constructor({message, title}) {
    super();
    this.state = {
      message: message,
      title: title
    }
  };

  componentDidUpdate = prevProps => {
    if (!prevProps.editing && this.props.editing) this.setState({message: this.props.message, title: this.props.title})
  };

  handleTextAreaChange = message => {
    this.setState({message})
  };

  handleTitleChange = title => {
    this.setState({title})
  };

  handleCancelEdit = () => {
    this.setState({message: '', title: ''});
    this.props.cancelEdit();
  };

  render() {
    const {postId, activeUser, cancelEdit, parent, goToMain} = this.props;
    //Type can be either reply or comment. username is the active user

    return (
      <Mutation mutation={UPDATE_POST}>
        {updatePost => (
          <form 
            className="form-group px-3 pb-3 pt-2 mb-3 rounded reply" 
            onSubmit={e => {
              e.preventDefault();
              cancelEdit();
              updatePost({variables: {message: this.state.message, postId, title: this.state.title}});
              this.setState({message: ''})
            }}
          >
            <div>Editing as {activeUser}</div>
            {parent 
            ? '' 
            : <input 
                className="form-control my-2" 
                value={this.state.title} 
                onChange={e => this.handleTitleChange(e.target.value)}
              />}
            <textarea 
              className="form-control my-2" 
              placeholder="Create a message" 
              style={{minHeight: '13rem'}}
              onChange={e => this.handleTextAreaChange(e.target.value)}
              value={this.state.message}
            />
            <div className="d-flex justify-content-between">
              <div>
                <button type="submit" className="btn btn-outline-info my-2 mx-2">Save Changes</button>
                <button className="btn btn-outline-danger my-2 mx-2" onClick={this.handleCancelEdit}>Cancel</button>
              </div>
              <Mutation mutation={DELETE_POST}>
                {deletePost => (
                  <button
                    className="btn btn-danger my-2 mx-2"
                    onClick={() => {
                      if (!parent) goToMain();
                      deletePost({ variables: { postId: postId } });
                    }}
                  >
                    Delete
                  </button>
                )}
              </Mutation>
            </div>
            <hr className="mt-4 mr-3"/>
          </form>
        )}}
      </Mutation>
    );
  }
}