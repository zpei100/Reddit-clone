import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import Posts from './components/posts.jsx';
import AddUser from './components/addUser.jsx';
import AddPost from './components/addPost.jsx';

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache(),
});

class App extends React.Component {

  constructor () {
    super();
    this.state = {
      username: ''
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
  }

  render () {
    return (
      <div className="container-fluid row">
        <Posts />
        {this.state.username === '' ? 
        <AddUser updateUsername={this.updateUsername.bind(this)} /> : 
        <AddPost username={this.state.username} />}
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