import React from 'react';
import $ from 'jquery';
import { Mutation } from 'react-apollo';
import { ADD_POST } from '../queries/queries.js';

export default function({username}) {

  const generatePost = () => ({
    title: $('#title').val(),
    message: $('#message').val(),
    user: username,
    parent: 1
  });

  const handleSubmit = (e, addPost) => {
    e.preventDefault();
    addPost({variables: {newPost: generatePost()}});
    $('#title').val('');
    $('#message').val('');
  }

  return (
    <Mutation mutation={ADD_POST} className="addPost">
      {addPost => (
        <form className="form-group col-sm-5 mt-3 w-75" onSubmit={(e) => handleSubmit(e, addPost)}>
          <input className="form-control" type="text" placeholder="Title" id="title"></input>
          <textarea className="form-control" placeholder="Create a message" id="message" style={{minHeight: '13rem'}}></textarea>
        </form>
      )}
    </Mutation>
  );
}