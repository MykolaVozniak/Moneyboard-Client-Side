import React, { Component } from 'react';
import API_URL from '../config';
//import { useAuth } from './autentification/AuthContext';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const url =  API_URL +  'api/Authentication/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      });

      if (response.ok) {
        alert('Ви успішно увійшли!');
        // Додайте тут код для перенаправлення користувача на іншу сторінку, наприклад, після успішного входу
      } else {
        alert('Помилка входу. Будь ласка, перевірте ваш email та пароль.');
      }
    } catch (error) {
      console.error('Помилка:', error);
    }
  };

  render() {
    return (
      <div>
        <h2>Вхід</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit">Увійти</button>
        </form>
      </div>
    );
  }
}

export default Login;