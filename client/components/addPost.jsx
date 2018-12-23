import React from 'react';
import $ from 'jquery';
import { Mutation } from 'react-apollo';
import { ADD_POST, UPDATE_POST } from '../queries/queries.js';

export default function({username, parentId, type, postBeingEdited, exitEdit}) {

  const generateNewPost = () => ({
    title: $('#title').val(),
    message: $('#message').val(),
    user: username,
    parent: parentId
  });

  const updatePost = () => ({
    title: $('#title').val(),
    message: $('#message').val(),
    postId: postBeingEdited
  });

  const handleSubmit = (e, handlePost) => {
    e.preventDefault();
    if ($('#title').val() === '' || $('#message').val() === '') {
      $('#title').val('');
      $('#message').val('');
      return alert('Please make sure you have a title and a message')
    };

    if (type === 'Post') {
      handlePost({variables: generateNewPost()});
    } else {
      handlePost({variables: updatePost()});
      exitEdit();
    }

    $('#title').val('');
    $('#message').val('');
  }

  return (
    <Mutation mutation={type === 'Post' ? ADD_POST : UPDATE_POST} id="addPost">
      {(handlePost, {loading, error}) => {

        if (error) console.log(error.toString());

        return <form className="form-group mt-3 w-75" onSubmit={(e) => handleSubmit(e, handlePost)}>
          <div>{type === 'Post' ? 'Make a new' : 'Update the'} {parentId === 'main' ? 'post' : 'comment'}</div>
          <input className="form-control my-2" type="text" placeholder="Title" id="title"></input>
          <textarea className="form-control my-2" placeholder="Create a message" id="message" style={{minHeight: '13rem'}}></textarea>
          <button type="submit" className="btn btn-primary my-2">{type}</button>
        </form>
      }}
    </Mutation>
  );
}