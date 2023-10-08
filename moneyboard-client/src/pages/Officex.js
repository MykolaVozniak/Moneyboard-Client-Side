import React from 'react';
import { useAuth } from '../autentification/AuthContext';

const Officex = () => {
  const { isLoggedIn, token, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h2>Офіс</h2>
      {isLoggedIn() ? (
        <div>
          <p>Ім'я користувача: {token}</p>
          <button onClick={handleLogout}>Вийти</button>
        </div>
      ) : (
        <p>Доступ заборонено. Будь ласка, увійдіть.</p>
      )}
    </div>
  );
};

export default Officex;