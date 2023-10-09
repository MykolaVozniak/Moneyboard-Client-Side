import React, { useState } from 'react';
import API_URL from '../config';

import { Navigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        cardNumber: '',
        birthDay: '',
        imageUrl: ''
    });

    const [isRegistered, setIsRegistered] = useState(false); // Додайте стан для переадресації

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = API_URL + 'api/Authentication/registration';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Реєстрація успішна!');
                setIsRegistered(true);
                // Додайте тут код для перенаправлення користувача на іншу сторінку, наприклад, після успішної реєстрації
            } else {
                alert('Помилка реєстрації. Будь ласка, спробуйте ще раз.');
            }
        } catch (error) {
            console.error('Помилка:', error);
        }

    };

    if (isRegistered) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container col-5 my-4">
            <h2 className='text-center'>Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className='row mt-3'>
                    <div className=" col-6">
                        <label className="form-label">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-6">
                        <label className="form-label">Surname:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="mt-2">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mt-2">
                    <label className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mt-2">
                    <label className="form-label">Payment card number:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mt-2">
                    <label className="form-label">Date of birth:</label>
                    <input
                        type="date"
                        className="form-control"
                        name="birthDay"
                        value={formData.birthDay}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mt-2">
                    <label className="form-label">URL image:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='d-flex justify-content-center mt-4'>
                <button type="submit" className="btn btn-primary col-8">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
