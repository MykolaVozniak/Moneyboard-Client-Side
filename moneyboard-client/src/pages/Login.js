import API_URL from '../config';
import React, { useState } from 'react';
import { useAuth } from '../autentification/AuthContext';

import { Navigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();

    const [isLoggedIn, setLoggedIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = API_URL + 'api/Authentication/login';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token; // Припустимо, що сервер надсилає токен як властивість 'token'
                login(token);
                alert('Ви успішно увійшли!');
                setLoggedIn(true);
            } else {
                alert('Помилка входу. Будь ласка, перевірте ваш email та пароль.');
            }
        } catch (error) {
            console.error('Помилка:', error);
        }
    };

    if (isLoggedIn) {
        setTimeout(() => {
            window.location.reload(); // f*kin cringe but it works
          }, 0);
        return <Navigate to="/workspace" />;
    }

    return (
        <div className="container col-5 my-4">
            <h2 className='text-center'>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div className="mt-3">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mt-3">
                    <label className="form-label">Пароль:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='d-flex justify-content-center mt-4'>
                <button type="submit" className="btn btn-primary col-6">Увійти</button>
                </div>
            </form>
        </div>
    );
}

export default Login;