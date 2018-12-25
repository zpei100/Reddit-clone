import React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_USER } from '../queries/queries.js';
import $ from 'jquery';

export default ({updateActiveUser, toggleLogin}) => {

  const handleMutationUpdate = (cache, {data}) => {
    if (!data.addUser) {
      $('#input-signup').val('');
      alert('Username already taken!');
    } else updateActiveUser(data.addUser.username);
  };

  const handleSignupSubmit = (e, addUser) => {
    e.preventDefault();
    const username = $('#input-signup').val();
    if (username === '') return;
    addUser({ variables: {username}})
  }

  return (
    <Mutation mutation={ADD_USER} update={handleMutationUpdate}>
      {addUser => (
        <form
          className="form-inline rounded"
          id="signup"
          onSubmit={e => handleSignupSubmit(e, addUser)}
        >
          <input className="form-control w-75" type="text" placeholder="Enter a new username" id="input-signup"/>
            <button className="btn rounded btn-dark btn-sm ml-3" type="submit">Sign Up</button>
            <button className="btn btn-warning btn-sm ml-3" onClick={toggleLogin}>Existing User?</button>
        </form> 
      )}
    </Mutation>
  );
}
