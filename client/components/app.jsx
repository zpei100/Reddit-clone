
import React from 'react';
import Axios from 'axios'
import Posts from './posts.jsx';
import AddUser from './addUser.jsx';
import AddPost from './addPost.jsx';
import Comments from './comments.jsx';
import UserPosts from './userPosts.jsx';

export default class App extends React.Component {

  constructor () {
    super();
    this.state = {

      loggedIn: false,

      username: '',
      parentId: 'main',
      replyTo: 'main',
      height: 0,
      master: 'main',
      type: 'Post',
      postBeingEdited: null
    };
  };

  componentDidMount = () => {
    this.setState({username: window.username});
  };

  exitEdit = () => {
    this.setState({postBeingEdited: null, type: 'Post'})
  }

  changePostComponent = (type, postId) => {
    this.setState({type, postBeingEdited: postId})
  };

  updateUsername = (username) => {
    this.setState({username})
  };

  updateParentId = (parentId) => {
    this.setState({parentId, master: 'main'})
  };

  comment = (postId) => {
    this.setState({replyTo: postId})
  };

  setHeight = (height) => {
    this.setState({height})
  };

  goToMain = () => {
    this.setState({parentId: 'main', replyTo: 'main', height: 0, master: 'main'})
  };

  handleUsernameClick = (username) => {
    this.setState({master: username, parentId: 'master'});
  }

  render () {
    return (
      <div className="container-fluid row m-auto" id="main-container"> 
        <div className="col-sm-8" id="posts">
          {this.state.parentId !== 'main' 
          ? this.state.postBeingEdited === null ? <button className="btn btn-danger w-100 mt-3" onClick={this.goToMain}>Main Page</button> : ''  
          : ''
          }

          {this.state.master !== 'main'
          ? <UserPosts username={this.state.master} comment={this.comment} updateParentId={this.updateParentId} handleUsernameClick={this.handleUsernameClick} /> 
          : this.state.parentId === 'main' 


          ? <Posts 
              parentId={this.state.parentId} 
              comment={this.comment} 
              updateParentId={this.updateParentId} 
              handleUsernameClick={this.handleUsernameClick} />
          
          
          : <Comments 
              handleUsernameClick={this.handleUsernameClick} 
              setHeight={this.setHeight} 
              parentId={this.state.parentId} 
              comment={this.comment} 
              activeUser={this.state.username}
              changePostComponent={this.changePostComponent}
              goToMain={this.goToMain}
              postBeingEdited={this.state.postBeingEdited} />
          }

        </div>

        <div className="col-sm-4" style={{top: this.state.height}}>
          {this.state.username === '' 
          ? <AddUser updateUsername={this.updateUsername} /> 
          : <AddPost postBeingEdited={this.state.postBeingEdited} type={this.state.type} username={this.state.username} parentId={this.state.replyTo} exitEdit={this.exitEdit} />}
        </div>

      </div>
    )
  }
}