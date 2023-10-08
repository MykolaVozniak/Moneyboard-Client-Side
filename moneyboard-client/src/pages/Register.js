import React, { Component } from 'react';
import API_URL from '../config';

class Register extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    cardNumber: '',
    birthDay: '',
    imageUrl: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const url = API_URL + 'api/Authentication/registration';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      });

      if (response.ok) {
        alert('Реєстрація успішна!');
        // Додайте тут код для перенаправлення користувача на іншу сторінку, наприклад, після успішної реєстрації
      } else {
        alert('Помилка реєстрації. Будь ласка, спробуйте ще раз.');
      }
    } catch (error) {
      console.error('Помилка:', error);
    }
  };

  render() {
    return (
      <div>
        <h2>Реєстрація</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Ім'я:</label>
            <input
              type="text"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Прізвище:</label>
            <input
              type="text"
              name="lastname"
              value={this.state.lastname}
              onChange={this.handleChange}
              required
            />
          </div>
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
          <div>
            <label>Номер карти:</label>
            <input
              type="text"
              name="cardNumber"
              value={this.state.cardNumber}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Дата народження:</label>
            <input
              type="date"
              name="birthDay"
              value={this.state.birthDay}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>URL зображення:</label>
            <input
              type="text"
              name="imageUrl"
              value={this.state.imageUrl}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit">Зареєструватися</button>
        </form>
      </div>
    );
  }
}

export default Register;