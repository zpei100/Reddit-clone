import React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_USER } from '../queries/queries.js';
import $ from 'jquery';

export default function({updateUsername}) {
  return (
    <Mutation 
      mutation={ADD_USER} 
      update={(cache, {data}) => {
        if (!data.addUser) {
          $('#username').val('');
          $('#username-input-label').text('Username already taken!');
          $('#username-input-label').addClass('text-danger');
        } else {
          updateUsername(data.addUser.username);
        }}}>

      {(addUser, {error}) => {
        if (error) console.log('there is an error: ', error)
        return (
        <div className="mt-3">
          <form
            className="form-group"
            onSubmit={e => {
              e.preventDefault()
              const username = $('#username').val();
              addUser({ variables: { username } });
            }}
          >
            <label id="username-input-label">Create a username here</label>
            <input className="form-control" name="username" type="text" placeholder="Enter a usernname" id="username" />
          </form>
        </div>
      )}}
    </Mutation>
  );
}
