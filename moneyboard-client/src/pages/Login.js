import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { setUser, setError } from '../redux/authSlice';
import API_URL from '../config';
import { Link } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.user);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const url = API_URL + 'api/Authentication/login';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(setUser(data));
                alert('Success');
                navigate('/workspace');
            } else {
                const errorData = await response.json();
                dispatch(setError(errorData.error));
                alert('Fail');
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className='container col-4 my-4'>
            <div className="card p-4 pb-1 my-5 rounded-4 border-0 shadow-lg">
                <h2 className='text-center'>Authorization</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mt-3'>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}

                            className='form-control'
                            placeholder='Your email'

                            required
                        />
                    </div>
                    <div className='mt-3'>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}

                            className='form-control'
                            placeholder='Your password'

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