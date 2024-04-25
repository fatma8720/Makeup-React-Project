import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(localStorage.getItem('isAuthenticated')));

  useEffect(() => {
    // Check if the user is authenticated from local storage
    const authStatus = JSON.parse(localStorage.getItem('isAuthenticated'));
    if (authStatus) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Route {...rest} render={(props) => (
      isAuthenticated
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  );
};

export default ProtectedRoute;
