import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import config from '../../../config';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../../redux/authSlice';
import { useNavigate } from 'react-router';

const ChangePassword = () => {
    const info = useSelector((state) => state.auth.info);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const [passwordFormData, setPasswordFormData] = useState({
        currentPassword: '',
        newPassword: '',
    });

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordFormData({ ...passwordFormData, [name]: value });
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(config.API_AUTH_CHANGE_PASSWORD, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json-patch+json',
                    'Authorization': `Bearer ${user.Token}`,
                },
                body: JSON.stringify(passwordFormData),
            });

            if (response.ok) {
                alert('success')
            } else {
                const dataError = await response.json();
                setError(dataError.errors);
            }
        } catch (error) {
            setError((prevError) => ({
                ...prevError,
                NewErrorKey: ['Unknown error, check the correctness of the entered data.']
            }));
        }
    };

    return (
        <div className='container col-sm-12 col-md-4 my-4'>
            <div className="card p-4 pb-1 my-5 rounded-4 border-0 shadow-lg">
                <h2 className='text-center'>Change Password</h2>
                {error && (
                    <div className='card rounded-2 p-2 mt-2 border-danger'>
                        {Object.keys(error).map((key) => (
                            <div key={key}>
                                <div style={{ whiteSpace: 'pre-line' }} className='text-danger'>
                                    {'! ' + error[key].join('\n! ')}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <Form onSubmit={handlePasswordSubmit}>
                    <Form.Group className="row mt-3">
                        <div className='col-12 col-md-4 text-md-end text-center card p-2 border-0'>
                            <p className="m-0 fw-bold">Current Password:</p>
                        </div>
                        <div className='col-12 col-md-7 mx-2'>
                            <Form.Control
                                type="password"
                                name="currentPassword"
                                className='m-0 p-2 text-center'
                                value={passwordFormData.currentPassword}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="row mt-3">
                        <div className='col-12 col-md-4 text-md-end text-center card p-2 border-0'>
                            <p className="m-0 fw-bold">New Password:</p>
                        </div>
                        <div className='col-12 col-md-7 mx-2'>
                            <Form.Control
                                type="password"
                                name="newPassword"
                                className='m-0 p-2 text-center'
                                value={passwordFormData.newPassword}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                    </Form.Group>

                    <div className='d-flex justify-content-center my-4'>
                        <Button variant="primary" type="submit" className='col-8'>
                            Change Password
                        </Button>
                    </div>
                </Form>
                <h2 className='text-center'>Delete Account</h2>

                <div className='d-flex justify-content-center mb-4 mt-2'>
                    <Button variant="danger" className='col-8'>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;