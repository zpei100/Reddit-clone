import React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_USER } from '../queries/queries.js';
import validator from 'validator';
import $ from 'jquery';

export default function({updateUsername}) {
  return (
    <Mutation mutation={ADD_USER}>
      {addUser => (
        <div className="mt-3">
          <form
            className="form-group"
            onSubmit={e => {
              e.preventDefault()
              const username = $('#username').val();
              if (!validator.isAlphanumeric(username)) {
                $('#username').val('')
                return alert('Please use only numbers and letters without spaces')
              };
              addUser({ variables: { username } });
              updateUsername(username);
            }}
          >
            <input className="form-control" type="text" placeholder="Enter a usernname" id="username" />
          </form>
        </div>
      )}
    </Mutation>
  );
}
