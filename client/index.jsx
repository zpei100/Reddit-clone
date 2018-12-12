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
      master: 'main'
    };
  };

  componentDidMount() {
    this.setState({username: window.location.search.slice(1)}, () => {
      console.log(this.state.username);
    });
  };

  updateUsername(username) {
    this.setState({username}, () => {
      window.location.search += username;
    })
  };

  updateParentId(parentId) {
    this.setState({parentId})
  };

  comment(postId) {
    this.setState({replyTo: postId}, () => {
      console.log(this.state.replyTo)
    })
  };

  setHeight(height) {
    this.setState({height})
  };

  goToMain() {
    this.setState({parentId: 'main'})
  };

  updateMaster(username) {
    this.setState({master: username});
  }

  render () {
    return (
      <div className="container-fluid row">
        <div className="col-sm-7">
          {this.state.parentId === 'main' 
          ? <Posts parentId={this.state.parentId} updateParentId={this.updateParentId.bind(this)} updateMaster={this.updateMaster.bind(this)} />
          : <div>
          <button className="btn btn-danger w-100 mt-3" onClick={this.goToMain.bind(this)}>Main Page</button>
          <Comments setHeight={this.setHeight.bind(this)} parentId={this.state.parentId} comment={this.comment.bind(this)} username={this.state.username} />
          </div>
          }
        </div>
        <div className="col-sm-5" style={{top: this.state.height}}>
          {this.state.username === '' ? 
          <AddUser updateUsername={this.updateUsername.bind(this)} /> : 
          <AddPost username={this.state.username} parentId={this.state.replyTo} />}
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