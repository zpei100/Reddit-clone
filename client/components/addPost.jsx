import React from 'react';
import $ from 'jquery';
import { Mutation } from 'react-apollo';
import { ADD_POST } from '../queries/queries.js';

export default function({username, parentId, height}) {

  const generatePost = () => ({
    title: $('#title').val(),
    message: $('#message').val(),
    user: username,
    parent: parentId
  });

  const handleSubmit = (e, addPost) => {
    e.preventDefault();
    console.log(generatePost())
    addPost({variables: generatePost()});
    $('#title').val('');
    $('#message').val('');
  }

  return (
    <Mutation mutation={ADD_POST} className="addPost">
      {(addPost, {loading, error}) => {

        if (error) console.log(error.toString());

        return <form className="form-group mt-3 w-75" onSubmit={(e) => handleSubmit(e, addPost)}>
          <input className="form-control my-2" type="text" placeholder="Title" id="title"></input>
          <textarea className="form-control my-2" placeholder="Create a message" id="message" style={{minHeight: '13rem'}}></textarea>
          <button type="submit" className="btn btn-primary my-2">Post</button>
        </form>
      }}
    </Mutation>
  );
}