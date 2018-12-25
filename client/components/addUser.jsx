import React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_USER } from '../queries/queries.js';
import $ from 'jquery';

export default ({updateActiveUser, switchLogin}) => {
  return (
    <Mutation 
      mutation={ADD_USER} 
      update={(cache, {data}) => {
        if (!data.addUser) {
          $('#username-signup').val('');
          alert('Username already taken!')
          $('#username-input-label').text('Username already taken!');
          $('#username-input-label').addClass('text-warning');
        } else {
          updateActiveUser(data.addUser.username);
        }}}>

      {(addUser, {error}) => {
        if (error) console.log('there is an error: ', error)
        return (
     
            <form
              className="form-inline  rounded"
              id="addUser"
              onSubmit={e => {
                e.preventDefault()
                const username = $('#username-signup').val();
                if (username === '') return;
                addUser({ variables: { username } });
              }}
            >
         
              <input className="form-control w-75" name="username" type="text" placeholder="Enter a new username" id="username-signup"/>
                <button className="btn rounded btn-dark btn-sm ml-3" type="submit">Sign Up</button>
                <button className="btn btn-warning btn-sm ml-3" onClick={switchLogin}>Existing User?</button>
            </form>
          
      )}}
    </Mutation>
  );
}
