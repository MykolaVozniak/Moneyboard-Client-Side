import React, { useState } from 'react';
import config from '../../config';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        cardNumber: '',
        birthDay: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(config.API_AUTH_REG, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                //alert('Success!');
                setError(null);
                navigate('/login');
            } else {
                const dataError = await response.json();
                setError(dataError.errors);
                //console.error(dataError.errors);
            }
        } catch (error) {
            //console.error(error);
            setError((prevError) => ({
                ...prevError,
                NewErrorKey: ['Unknown error, check the correctness of the entered data.']
            }));
        }
    };

    return (
        <div className='container col-sm-12 col-md-4 my-4'>
            <div className="card p-4 pb-1 my-5 rounded-4 border-0 shadow-lg">
                <h2 className='text-center'>Registration</h2>
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
                <form onSubmit={handleSubmit}>
                    <div className='row mt-3'>
                        <div className='col-6'>
                            <InputGroup className="mb-3">
                                <FormControl
                                    type='text'
                                    placeholder='Firstname'
                                    name='firstname'
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    required
                                />
                            </InputGroup>
                        </div>
                        <div className='col-6'>
                            <InputGroup className="mb-3">
                                <FormControl
                                    type='text'
                                    placeholder='Lastname'
                                    name='lastname'
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    required
                                />
                            </InputGroup>
                        </div>
                    </div>

                    <InputGroup className="mb-3">
                        <FormControl
                            type='email'
                            placeholder='Email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <FormControl
                            type='text'
                            placeholder='Payment card number'
                            name='cardNumber'
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                    <InputGroup.Text>Birthdate</InputGroup.Text>
                        <FormControl
                            type='date'
                            name='birthDay'
                            value={formData.birthDay}
                            onChange={handleChange}
                            required
                        />
                    </InputGroup>
                    <div className='d-flex justify-content-center mt-4'>
                        <Button type='submit' className='btn-primary col-8'>Submit</Button>
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