import API_URL from '../config';
import React, { useState } from 'react';
import { useAuth } from '../autentification/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();

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
                // Додайте тут код для перенаправлення користувача на іншу сторінку, наприклад, після успішного входу
            } else {
                alert('Помилка входу. Будь ласка, перевірте ваш email та пароль.');
            }
        } catch (error) {
            console.error('Помилка:', error);
        }
    };

    return (
        <div>
            <h2>Вхід</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Увійти</button>
            </form>
        </div>
    );
}

export default Login;