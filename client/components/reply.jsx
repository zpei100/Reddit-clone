import React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_POST } from '../queries/queries.js';

export default class Reply extends React.Component {

  constructor() {
    super();
    this.state = {
      message:''
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.activeUser && !this.props.activeUser) this.setState({message: ''})
  };

  handleTextAreaChange = (message) => {
    this.setState({message})
  };

  handleCancel = () => {
    this.setState({message: ''});
    this.props.toggleShowReplyBox();
  };

  render() {
    const {replyTo, type, activeUser, showReplyBox} = this.props;
    //Type can be either reply or comment. username is the active user
    return (
      showReplyBox && activeUser 
      ? <Mutation mutation={ADD_POST}>
        {addPost => (
          <form 
            className="form-group px-3 pb-3 pt-2 mb-3 rounded reply" 
            onSubmit={e => {
              e.preventDefault();
              addPost({variables: {message: this.state.message, user: activeUser, parent: replyTo}});
              this.handleCancel();
            }}
          >
            <div>{type} as {activeUser}</div>
            <textarea 
              className="form-control my-2" 
              placeholder="Create a message" 
              style={{minHeight: '13rem'}}
              onChange={e => this.handleTextAreaChange(e.target.value)}
              value={this.state.message}
            />
            <button type="submit" className="btn btn-outline-info my-2 mx-2">{type}</button>
            {type === 'Comment' ? '' : <button className="btn btn-outline-danger mx-2" onClick={this.handleCancel}>Cancel</button>}
            <hr className="mt-4 mr-3"/>
          </form>
        )}}
      </Mutation>
      : ''
    );
  }
}