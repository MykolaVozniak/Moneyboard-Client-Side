import React, { Component } from 'react';
import API_URL from '../config';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            cardNumber: '',
            birthDay: '',
            imageUrl: ''
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        fetch(API_URL+'api/Authentication/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Registration successful:', data);
            })
            .catch(error => {
                console.error('Error registering:', error);
            });
    }

    render() {
        return (
            <div>
                <h2>Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input type="text" name="firstname" onChange={this.handleInputChange} required />
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" name="lastname" onChange={this.handleInputChange} required />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" onChange={this.handleInputChange} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" onChange={this.handleInputChange} required />
                    </div>
                    <div>
                        <label>Card Number:</label>
                        <input type="text" name="cardNumber" onChange={this.handleInputChange} required />
                    </div>
                    <div>
                        <label>Birth Day:</label>
                        <input type="date" name="birthDay" onChange={this.handleInputChange} required />
                    </div>
                    <div>
                        <label>Image URL:</label>
                        <input type='url' name="imageUrl" onChange={this.handleInputChange} required />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}

export default Register;
