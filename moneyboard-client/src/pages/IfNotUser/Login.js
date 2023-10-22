import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, setUserInfo } from '../../redux/authSlice';
import config from '../../config';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const fullPath = window.location.href;
    const invitePath = `${window.location.origin}/invite/`;

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
                if (fullPath.includes(invitePath)){
                }
                else{
                    navigate('/workspace');
                }
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
        <>
            <div className='h-100'>
                <Container className='h-100'>
                    <Row>
                        <Col xs={12} className='d-flex align-items-center justify-content-center'>
                            <Container className='bg-white border-0 rounded-4 shadow-lg px-5 py-4 mt-5 col-sm-12 col-md-4'>
                                <h2 className='text-center'>Authorization</h2>
                                {error && (
                                    <Card className='rounded-2 p-2 mt-4 border-danger'>
                                        <p className='text-danger m-0'>! {error}</p>
                                    </Card>
                                )}
                                <Form onSubmit={handleSubmit}>
                                    <InputGroup className="mt-4">
                                        <FormControl
                                            type="email"
                                            name="email"
                                            placeholder='Your email'
                                            value={formData.email}
                                            onChange={handleChange}
                                            className='form-control'
                                            required
                                        />
                                    </InputGroup>
                                    <InputGroup className="mt-3">
                                        <FormControl
                                            type="password"
                                            name="password"
                                            placeholder='Your password'
                                            value={formData.password}
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
                                    <p className='text-center mb-2'>Don't have account? <Link to='/register'>Sign Up</Link></p>
                                </div>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Login;