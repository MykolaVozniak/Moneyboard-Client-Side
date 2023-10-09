import React from 'react';
import { useAuth } from '../autentification/AuthContext';
import { Navigate } from 'react-router';

const Workspace = () => {
  const { isLoggedIn, token} = useAuth();
  
  return (
    <div>
      {isLoggedIn() ? (
        <div>
          <h2>Workspace</h2>
          <p>Ім'я користувача: {token}</p>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default Workspace;