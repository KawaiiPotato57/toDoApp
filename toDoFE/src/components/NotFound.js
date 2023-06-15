import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    console.log("atleast it is")
  return (
    <div >
      <h1>404 Not Found</h1>
      <h4>Sorry, the page you're looking for does not exist.</h4>
      <Link to="/">Go back to the home page</Link>
    </div>
  );
}

export default NotFound;
