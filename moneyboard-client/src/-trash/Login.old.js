import API_URL from '../config';
import React, { useState } from 'react';
import { useAuth } from '../autentification/AuthContext';

import { Link, Navigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();

    const [user, setLoggedIn] = useState(false);

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
                const token = data.token; // 'token'
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

    if (user) {
        setTimeout(() => {
            window.location.reload(); // cringe
        }, 1);
        return <Navigate to='/workspace' />;
    }

    return (
        <div className='container col-4 my-4'>
            <div className="card p-4 pb-1 my-5 rounded-4 border-0 shadow-lg">
                <h2 className='text-center'>Authorization</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mt-3'>
                        <input
                            type='email'
                            className='form-control'
                            placeholder='Your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mt-3'>
                        <input
                            type='password'
                            className='form-control'
                            placeholder='Your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className='d-flex justify-content-center mt-4'>
                        <button type='submit' className='btn btn-primary col-6'>Sign In</button>
                    </div>
                </form>
                <div className='mt-3'>
                    <p className='text-center'>Don't have account? <Link to='/register'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;