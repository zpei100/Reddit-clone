import React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_USER } from '../queries/queries.js';
import $ from 'jquery';

export default function({updateUsername, height, switchLogin}) {
  return (
    <Mutation 
      mutation={ADD_USER} 
      update={(cache, {data}) => {
        if (!data.addUser) {
          $('#username-signup').val('');
          $('#username-input-label').text('Username already taken!');
          $('#username-input-label').addClass('text-danger');
        } else {
          updateUsername(data.addUser.username);
        }}}>

      {(addUser, {error}) => {
        if (error) console.log('there is an error: ', error)
        return (
          <div className="col-sm-3 mt-3">
         
          <form
            className="form-group px-3 pb-3 pt-2 mb-3 rounded"
            style={{top:height}}
            id="addUser"
            onSubmit={e => {
              e.preventDefault()
              const username = $('#username-signup').val();
              if (username === '') return;
              addUser({ variables: { username } });
            }}
          >
            <label id="username-input-label">Create a username here</label>
            <input className="form-control" name="username" type="text" placeholder="Enter a usernname" id="username-signup"/>
            <div className="d-flex justify-content-start mt-3">
              <button className="btn btn-light btn-sm" type="submit">Sign Up</button>
              <button className="btn btn-warning btn-sm ml-3" onClick={switchLogin}>Existing User?</button>
            </div>
          </form>
          </div>
      )}}
    </Mutation>
  );
}
