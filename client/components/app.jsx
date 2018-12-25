
import React from 'react';
import Posts from './posts.jsx';
import AddPost from './addPost.jsx';
import Comments from './comments.jsx';
import UserPosts from './userPosts.jsx';
import Nav from './navbar.jsx';

import Axios from 'axios';

export default class App extends React.Component {

  constructor () {
    super();
    this.state = {
      activeUser: '',
      login: false,
      parentId: 'main',
      replyTo: 'main',
      height: 0,
      master: 'main',
      type: 'Post',
      postBeingEdited: null,

    };
  };

  componentDidMount = () => {
    this.setState({activeUser: window.activeUser});
  };

  exitEdit = () => {
    this.setState({postBeingEdited: null, type: 'Post'})
  }

  changePostComponent = (type, postId) => {
    this.setState({type, postBeingEdited: postId})
  };

  updateActiveUser = activeUser => {
    this.setState({activeUser})
  };

  updateParentId = (parentId) => {
    this.setState({parentId, master: 'main'})
  };

  goToMain = () => {
    this.setState({parentId: 'main', replyTo: 'main', height: 0, master: 'main'})
  };

  handleUsernameClick = username => {
    this.setState({master: username, parentId: 'master'});
  };

  switchLogin = () => {
    this.setState({login: !this.state.login})
  }
  
  handleLogout = () => {
    Axios.get('/logout').then(() => {this.setState({activeUser: ''})});
  }

  render () {
    return (
      <div className="container-fluid d-flex m-auto" id="main-container"> 
        <div className="col-sm-8" id="posts">

          <Nav activeUser={this.state.activeUser} updateActiveUser={this.updateActiveUser} switchLogin={this.switchLogin} login={this.state.login} goToMain={this.goToMain} parentId={this.state.parentId} handleLogout={this.handleLogout}/>

          {/* {this.state.parentId !== 'main' 
          ? this.state.parentId === 'main' ? ''
          : <button className="btn rounded border border-dark mt-3" id="main-page-button" onClick={this.goToMain}>Main Page</button>  
          : ''
          } */}

          {this.state.master !== 'main'
          ? <UserPosts username={this.state.master} comment={this.comment} updateParentId={this.updateParentId} handleUsernameClick={this.handleUsernameClick} /> 
          : this.state.parentId === 'main' 


          ? <Posts 
              parentId={this.state.parentId} 
         
              updateParentId={this.updateParentId} 
              handleUsernameClick={this.handleUsernameClick} />
          
          
          : <Comments 
              handleUsernameClick={this.handleUsernameClick} 
              setHeight={this.setHeight} 
              parentId={this.state.parentId} 
              
              activeUser={this.state.activeUser}
              changePostComponent={this.changePostComponent}
              goToMain={this.goToMain}
              postBeingEdited={this.state.postBeingEdited} />
          }

        </div>

          {this.state.activeUser && this.state.parentId === 'main' ? <AddPost postBeingEdited={this.state.postBeingEdited} type={this.state.type} username={this.state.activeUser} parentId={this.state.replyTo} exitEdit={this.exitEdit} height={this.state.height} /> : ''}

        
          {/* {this.state.username === '' 
          ? this.state.login ? <Login updateUsername={this.updateUsername} height={this.state.height} switchLogin={this.switchLogin} />
          : <AddUser updateUsername={this.updateUsername} height={this.state.height} switchLogin={this.switchLogin}/> 
          : this.state.parentId === 'main' ? <AddPost postBeingEdited={this.state.postBeingEdited} type={this.state.type} username={this.state.username} parentId={this.state.replyTo} exitEdit={this.exitEdit} height={this.state.height} /> : ''} */}
      </div>
    )
  }
}