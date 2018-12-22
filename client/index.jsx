import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import Posts from './components/posts.jsx';
import AddUser from './components/addUser.jsx';
import AddPost from './components/addPost.jsx';
import Comments from './components/comments.jsx';
import UserPosts from './components/userPosts.jsx';

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache(),
});

class App extends React.Component {

  constructor () {
    super();
    this.state = {
      username: '',
      parentId: 'main',
      replyTo: 'main',
      height: 0,
      master: 'main',
      type: 'Post',
      postBeingEdited: null
    };

  this.changePostComponent = this.changePostComponent.bind(this);
  this.updateUsername = this.updateUsername.bind(this);
  this.updateParentId = this.updateParentId.bind(this);
  this.comment = this.comment.bind(this);
  this.setHeight = this.setHeight.bind(this);
  this.goToMain = this.goToMain.bind(this);
  this.handleUsernameClick = this.handleUsernameClick.bind(this);
  this.exitEdit = this.exitEdit.bind(this);
  };


  exitEdit() {
    this.setState({postBeingEdited: null, type: 'Post'})
  }

  changePostComponent(type, postId) {
    this.setState({type, postBeingEdited: postId})
  };

  componentDidMount() {
    this.setState({username: window.location.search.slice(1)}, () => {
    });
  };

  updateUsername(username) {
    this.setState({username}, () => {
      window.location.search += username;
    })
  };

  updateParentId(parentId) {
    this.setState({parentId, master: 'main'})
  };

  comment(postId) {
    this.setState({replyTo: postId})
  };

  setHeight(height) {
    this.setState({height})
  };

  goToMain() {
    this.setState({parentId: 'main', replyTo: 'main', height: 0, master: 'main'})
  };

  handleUsernameClick(username) {
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

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app'),
);