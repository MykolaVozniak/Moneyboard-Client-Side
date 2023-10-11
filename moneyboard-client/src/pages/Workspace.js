import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Workspace = () => {
  const isLoggedIn = useSelector((state) => state.auth.user);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <p>Вітаємо, {isLoggedIn.Token}!</p>
    </div>

  );
};

export default Workspace;