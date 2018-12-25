import React from 'react';
import { LOGIN, ADD_USER } from '../queries/queries.js';
import Login from './login.jsx';
import Signup from './signup.jsx';

export default (props) => {
  const {login, activeUser, goToMain, handleLogout} = props;

  return (
    <nav className="navbar bg-info mt-3 rounded border border-dark">
      <a className="navbar-brand rounded mr-3 font-weight-bold" href="#" onClick={goToMain}>Main Page</a>  
      {!activeUser 
        ? login 
          ? <Login {...props} /> 
          : <Signup {...props}/> 
        : <button className='btn btn-dark' onClick={handleLogout}>Logout</button>}
    </nav>
  )
}

