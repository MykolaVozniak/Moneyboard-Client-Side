import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, setUserInfo } from '../../redux/authSlice';
import config from '../../config';
import { Link } from 'react-router-dom';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

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
                const dataLogin = await responseLogin.json();
                //console.log(dataLogin);
                dispatch(setUser(dataLogin));

                const responseInfo = await fetch(config.API_USER_INFO, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${dataLogin.Token}`
                    }
                });
                const dataInfo = await responseInfo.json();
                dispatch(setUserInfo(dataInfo));
                //console.log(dataInfo);
                //alert('Success');
                navigate('/workspace');
            } else {
                const dataError = await responseLogin.json();
                setError(dataError.error);
                //console.log(dataError.error);
                //alert(`Error: ${dataError.Message}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='container col-sm-12 col-md-4 my-4'>
            <div className="card p-4 pb-1 my-5 rounded-4 border-0 shadow-lg">
                <h2 className='text-center'>Authorization</h2>
                {error && (
                    <div className='card rounded-2 p-2 mt-2 border-danger'>
                        <p className='text-danger m-0'>! {error}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit}>

                    <InputGroup className="mb-3">
                        <FormControl
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className='form-control'
                            placeholder='Your email'
                            required
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className='form-control'
                            placeholder='Your password'
                            required
                        />
                    </InputGroup>

                    <div className='d-flex justify-content-center mt-4'>
                        <Button type='submit' className='btn-primary col-8'>Submit</Button>
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