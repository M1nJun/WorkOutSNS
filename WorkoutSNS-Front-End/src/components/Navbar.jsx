import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/bootstrap.min.css';
 
const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>{' '}
      <Link to="/profile">Profile</Link>{' '}
      <Link to="/search">Search</Link>{' '}
      <Link to="/newPost">New Post</Link>
    </nav>
  );
};

export default Navbar;
