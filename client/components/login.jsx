import React from 'react';
import { Mutation } from 'react-apollo';
import { LOGIN } from '../queries/queries.js';
import $ from 'jquery';

export default function({height, updateUsername, switchLogin}) {
  return (
    <Mutation 
      mutation={LOGIN} 
      update={(cache, {data}) => {
        if (!data.login) {
          alert('username does not exist ! try again!!!');
          $('#username-login').val('');
        } else {
          updateUsername(data.login.username);
        }}}>

      {(login, {error}) => {
        if (error) console.log('there is an error: ', error)
        return (
          <div className="col-sm-3 mt-3">
         
          <form
            className="form-group px-3 pb-3 pt-2 mb-3 rounded"
            style={{top:height}}
            id="addUser"
            onSubmit={e => {
              e.preventDefault()
              const username = $('#username-login').val();
              if (username === '') return;
              login({ variables: { username } });
            }}
          >
            <label id="username-input-label">Enter an existing username</label>
            <input className="form-control" name="username" type="text" placeholder="Enter a usernname" id="username-login"/>
            <div className="d-flex justify-content-start mt-3">
              <button className="btn btn-light btn-sm" type="submit">Login</button>
              <button className="btn btn-warning btn-sm ml-3" onClick={switchLogin}>New User?</button>
            </div>
          </form>
          </div>
      )}}
    </Mutation>
  );
}