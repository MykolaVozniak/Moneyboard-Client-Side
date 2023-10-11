import React, { useState } from 'react';
import API_URL from '../config';

import { Link, Navigate } from 'react-router-dom';

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
            } else {
                alert('Помилка реєстрації. Будь ласка, спробуйте ще раз.');
            }
        } catch (error) {
            console.error('Помилка:', error);
        }

    };

    if (isRegistered) {
        return <Navigate to='/login' />;
    }

    return (
        <div className='container col-4 my-4'>
            <div className="card p-4 pb-1 my-5 rounded-4 border-0 shadow-lg">
                <h2 className='text-center'>Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className='row mt-3'>
                        <div className=' col-6'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Firstname'
                                name='firstname'
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-6'>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Lastname'
                                name='lastname'
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <input
                            type='email'
                            className='form-control'
                            placeholder='Email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mt-3'>
                        <input
                            type='password'
                            className='form-control'
                            placeholder='Password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mt-3'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Payment card number'
                            name='cardNumber'
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mt-3'>
                        <input
                            type='date'
                            className='form-control'
                            placeholder='Birthdate'
                            name='birthDay'
                            value={formData.birthDay}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mt-3'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Url image'
                            name='imageUrl'
                            value={formData.imageUrl}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='d-flex justify-content-center mt-4'>
                        <button type='submit' className='btn btn-primary col-8'>Submit</button>
                    </div>
                </form>
                <div className='mt-3'>
                    <p className='text-center'>Already have account? <Link to='/login'>Sign In</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
