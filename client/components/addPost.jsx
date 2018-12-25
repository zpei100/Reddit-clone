import React from 'react';
import $ from 'jquery';
import { Mutation } from 'react-apollo';
import { ADD_POST } from '../queries/queries.js';

export default function({username}) {
  const generateNewPost = () => ({
    title: $('#title').val(),
    message: $('#message').val(),
    user: username,
    parent: 'main'
  });

  const handleSubmit = (e, handlePost) => {
    e.preventDefault();
    if ($('#title').val() === '' || $('#message').val() === '') {
      $('#title').val('');
      $('#message').val('');
      return alert('Please make sure you have a title and a message')
    };
   
    handlePost({variables: generateNewPost()});

    $('#title').val('');
    $('#message').val('');
  };

  return (
    <Mutation mutation={ADD_POST}>
      {handlePost => {
        return <div className="col-sm-4 mt-3">
          <form className="form-group px-3 pb-3 pt-2 mb-3 rounded" onSubmit={(e) => handleSubmit(e, handlePost)} id="addPost">
            <div className="text-light">Make a new post</div>
            <input className="form-control my-2" type="text" placeholder="Title" id="title"></input>
            <textarea className="form-control my-2" placeholder="Create a message" id="message" style={{minHeight: '13rem'}}></textarea>
            <button type="submit" className="btn btn-dark my-2">Post</button>
          </form>
        </div>
        }
      }
    </Mutation>
  );
}