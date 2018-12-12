import React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_USER } from '../queries/queries.js';
import $ from 'jquery';

export default function({updateUsername}) {
  return (
    <Mutation mutation={ADD_USER}>
      {addUser => (
        <div className="col-sm-5 mt-3">
          <form
            className="form-group"
            onSubmit={e => {
              e.preventDefault()
              const username = $('#username').val();
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
