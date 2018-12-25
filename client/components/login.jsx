import React from 'react';
import { Mutation } from 'react-apollo';
import { LOGIN } from '../queries/queries.js';
import $ from 'jquery';

export default ({updateActiveUser, toggleLogin}) => {

  const handleMutationUpdate = (cache, {data}) => {
    if (!data.login) {
      alert('username does not exist! Try again.');
      $('input-login').val('');
    } else updateActiveUser(data.login.username);
  };

  const handleLoginSubmit = (e, login) => {
    e.preventDefault()
    const username = $('#input-login').val();
    if (username === '') return;
    login({ variables: { username } });
    console.log('this works')
    updateActiveUser(username);
  };

  return (
    <Mutation mutation={LOGIN} update={handleMutationUpdate}>
      {login => (
        <form
          className="form-inline rounded"
          id="addUser"
          onSubmit={e => handleLoginSubmit(e, login)}
        >
          <input className="form-control w-75" name="username" type="text" placeholder="Enter an existing usernname" id="input-login"/>
          <button className="btn rounded btn-dark btn-sm ml-3" type="submit">Login</button>
          <button className="btn btn-warning btn-sm ml-3" onClick={toggleLogin}>New User?</button>
        </form>
      )}
    </Mutation>
  );
}