
import React from 'react';
import Posts from './posts.jsx';
import AddPost from './addPost.jsx';
import Comments from './comments.jsx';
import UserPosts from './userPosts.jsx';
import Nav from './navbar.jsx';
import Axios from 'axios';

export default class App extends React.Component {

  //if parentId = 'main', you all see all primary main posts
  //if parentId = 'some uuid', you ll that post and all of its sub posts / comments
  //if filteredByUser = 'zen', you ll see all posts by zen
  //login toggles login and signup view

  constructor () {
    super()
    this.state = {
      activeUser: '',
      login: false,
      parentId: 'main',
      filteredByUser: null,
    };
  };

  componentDidMount = () => {
    this.setState({activeUser: window.activeUser});
  };

  updateActiveUser = activeUser => {
    this.setState({activeUser})
  };

  handleTitleClick = parentId => {
    this.setState({parentId, filteredByUser: null})
  };

  goToMain = () => {
    this.setState({parentId: 'main', filteredByUser: null})
  };

  handleUsernameClick = username => {
    this.setState({filteredByUser: username});
  };

  toggleLogin = () => {
    this.setState({login: !this.state.login})
  };
  
  handleLogout = () => {
    Axios.get('/logout').then(() => {this.setState({activeUser: ''})}).catch(() => alert('there was an error logging out. Please try again later'));
  };

  render () {
    const {activeUser, login, filteredByUser, parentId} = this.state;

    return (
      <div className="container-fluid d-flex m-auto" id="main-container"> 
        <div className="col-sm-8" id="posts">

          <Nav 
            activeUser={activeUser} 
            updateActiveUser={this.updateActiveUser} 
            toggleLogin={this.toggleLogin} 
            login={login} 
            goToMain={this.goToMain} 
            handleLogout={this.handleLogout}
          />

          {filteredByUser
            ? <UserPosts 
                username={filteredByUser} 
                comment={this.comment} 
                handleTitleClick={this.handleTitleClick} 
                handleUsernameClick={this.handleUsernameClick} 
              /> 
            : parentId === 'main' 
              ? <Posts 
                  parentId={parentId} 
                  handleTitleClick={this.handleTitleClick} 
                  handleUsernameClick={this.handleUsernameClick} 
                />
              : <Comments 
                  handleUsernameClick={this.handleUsernameClick} 
                  parentId={parentId} 
                  activeUser={activeUser}
                  goToMain={this.goToMain}
                />
          }

        </div>
        {activeUser && parentId === 'main' ? <AddPost username={activeUser}/> : ''}
      </div>
    )
  }
}