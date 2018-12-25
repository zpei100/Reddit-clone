import React from 'react';
import { Mutation } from 'react-apollo';
import { LOGIN, ADD_USER } from '../queries/queries.js';
import Login from './login.jsx';
import AddUser from './addUser.jsx';

export default (props) => {
  const {login, activeUser, goToMain, handleLogout} = props;

  return (
    <nav className="navbar bg-info mt-3 rounded border border-dark">
      <a className="navbar-brand rounded mr-3 font-weight-bold" href="#" onClick={goToMain}>Main Page</a>  
      {!activeUser 
        ? login 
          ? <Login {...props} /> 
          : <AddUser {...props}/> 
        : <button className='btn btn-dark' onClick={handleLogout}>Logout</button>}
    </nav>
  )
}

