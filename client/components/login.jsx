import React from 'react';
import { Mutation } from 'react-apollo';
import { LOGIN } from '../queries/queries.js';
import $ from 'jquery';


export default ({updateActiveUser, switchLogin}) => {
  return (
    <Mutation 
      mutation={LOGIN} 
      update={(cache, {data}) => {
        if (!data.login) {
          alert('username does not exist ! try again!!!');
          $('#username-login').val('');
        } else {
          updateActiveUser(data.login.username);
        }}}>

      {login => {

        return (
   
         
          <form
            className="form-inline rounded"
            id="addUser"
            onSubmit={e => {
              e.preventDefault()
              const username = $('#username-login').val();
              if (username === '') return;
              login({ variables: { username } });
            }}
          >
            <input className="form-control w-75" name="username" type="text" placeholder="Enter an existing usernname" id="username-login"/>
            <button className="btn rounded btn-dark btn-sm ml-3" type="submit">Login</button>
            <button className="btn btn-warning btn-sm ml-3" onClick={switchLogin}>New User?</button>
          </form>

      )}}
    </Mutation>
  );
}