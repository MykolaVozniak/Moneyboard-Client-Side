import React, { useState } from 'react';
import config from '../../config';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState('');

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

        if (formData.password !== confirmPassword) {
            setError((prevError) => ({
                ...prevError,
                NewErrorKey: ['Passwords do not match.']
            }));
        }
    };

    return (
        <>
            <div className='h-100'>
                <Container className='h-100'>
                    <Row>
                        <Col xs={12} className='d-flex align-items-center justify-content-center'>
                            <Container className='bg-white border-0 rounded-4 shadow-lg px-5 py-4 mt-5 col-sm-12 col-md-4'>
                                <h2 className='text-center'>Registration</h2>
                                {error && (
                                    <div className='card rounded-2 p-2 mt-4 border-danger'>
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
                                    <Row className='mt-4'>
                                        <Col>
                                            <InputGroup>
                                                <FormControl
                                                    type='text'
                                                    name='firstname'
                                                    placeholder='Firstname'
                                                    value={formData.firstname}
                                                    onChange={handleChange}
                                                    className='form-control'
                                                    required
                                                />
                                            </InputGroup>
                                        </Col>
                                        <Col>
                                            <InputGroup>
                                                <FormControl
                                                    type='text'
                                                    name='lastname'
                                                    placeholder='Lastname'
                                                    value={formData.lastname}
                                                    onChange={handleChange}
                                                    className='form-control'
                                                    required
                                                />
                                            </InputGroup>
                                        </Col>
                                    </Row>

                                    <InputGroup className="mt-3">
                                        <FormControl
                                            type='email'
                                            name='email'
                                            placeholder='Email'
                                            value={formData.email}
                                            onChange={handleChange}
                                            className='form-control'
                                            required
                                        />
                                    </InputGroup>

                                    <InputGroup className="mt-3">
                                        <FormControl
                                            type='password'
                                            name='password'
                                            placeholder='Password'
                                            value={formData.password}
                                            onChange={handleChange}
                                            className='form-control'
                                            required
                                        />
                                    </InputGroup>

                                    <InputGroup className="mt-3">
                                        <FormControl
                                            type='password'
                                            name='confirmPassword'
                                            placeholder='Confirm Password'
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className='form-control'
                                            required
                                        />
                                    </InputGroup>

                                    <InputGroup className="mt-3">
                                        <FormControl
                                            type='number'
                                            name='cardNumber'
                                            placeholder='Payment card number'
                                            value={formData.cardNumber}
                                            onChange={handleChange}
                                            className='form-control'
                                            required
                                        />
                                    </InputGroup>

                                    <InputGroup className="mt-3">
                                        <InputGroup.Text>Birthdate</InputGroup.Text>
                                        <FormControl
                                            type='date'
                                            name='birthDay'
                                            value={formData.birthDay}
                                            onChange={handleChange}
                                            className='form-control'
                                            required
                                        />
                                    </InputGroup>
                                    <div className='d-flex justify-content-center mt-4'>
                                        <Button type='submit' variant="primary" className='col-8'>Submit</Button>
                                    </div>
                                </Form>
                                <div className='mt-3'>
                                    <p className='text-center mb-2'>Already have account? <Link to='/login'>Sign In</Link></p>
                                </div>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Register;