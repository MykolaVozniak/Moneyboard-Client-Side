import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import config from '../../../config';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../../redux/authSlice';
import { useNavigate } from 'react-router';

const AccountEdit = () => {
    const info = useSelector((state) => state.auth.info);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        firstname: `${info.Firstname}`,
        lastname: `${info.Lastname}`,
        cardNumber: `${info.CardNumber}`,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(config.API_USER_EDIT, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json-patch+json',
                    'Authorization': `Bearer ${user.Token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setError(null);
                const responseInfo = await fetch(config.API_USER_INFO, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${user.Token}`
                    }
                });
                const dataInfo = await responseInfo.json();
                dispatch(setUserInfo(dataInfo));
                navigate('/account');
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
            <div className='card p-4 pb-1 my-5 rounded-4 border-0 shadow-lg'>
                <h2 className='text-center'>Change Account Info</h2>
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
                <Form onSubmit={handleSubmit}>

                    <Form.Group className='row mt-3'>
                        <div className='col-12 col-md-4 text-md-end text-center card p-2 border-0'>
                            <p className='m-0 fw-bold'>First Name:</p>
                        </div>
                        <div className='col-12 col-md-7 mx-2'>
                            <Form.Control
                                type='text'
                                name='firstname'
                                className='m-0 p-2 text-center'
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className='row mt-3'>
                        <div className='col-12 col-md-4 text-md-end text-center card p-2 border-0'>
                            <p className='m-0 fw-bold'>Last Name:</p>
                        </div>
                        <div className='col-12 col-md-7 mx-2'>
                            <Form.Control
                                type='text'
                                name='lastname'
                                className='m-0 p-2 text-center'
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className='row mt-3'>
                        <div className='col-12 col-md-4 text-md-end text-center card p-2 border-0'>
                            <p className='m-0 fw-bold'>Card Number:</p>
                        </div>
                        <div className='col-12 col-md-7 mx-2'>
                            <Form.Control
                                type='number'
                                name='cardNumber'
                                className='m-0 p-2 text-center'
                                value={formData.cardNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </Form.Group>

                    <div className='d-flex justify-content-center my-4'>
                        <Button variant='primary' type='submit' className='col-8'>
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AccountEdit;
