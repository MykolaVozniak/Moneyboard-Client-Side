import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { setUser, setUserInfo } from '../redux/authSlice';
import config from '../config';
import { Link } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.user);
    const [justLoggedIn, setJustLoggedIn] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responseLogin = await fetch(config.API_AUTH_LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (responseLogin.ok) {
                setJustLoggedIn(true);
                const dataLogin = await responseLogin.json();
                console.log(dataLogin);
                dispatch(setUser(dataLogin));

                const responseInfo = await fetch(config.API_USER_INFO, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${dataLogin.Token}`
                    }
                });
                const dataInfo = await responseInfo.json();
                //console.log(dataInfo);
                dispatch(setUserInfo(dataInfo))
                alert('Success');
                navigate('/workspace');
            } else {
                const dataError = await responseLogin.json();
                //console.log(dataError);
                alert(`Error: ${dataError.Message}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoggedIn && !justLoggedIn) {
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