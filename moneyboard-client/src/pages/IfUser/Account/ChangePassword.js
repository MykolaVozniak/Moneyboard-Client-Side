import React, { useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import config from '../../../config';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../../redux/authSlice';
import { useNavigate } from 'react-router';
import { ExclamationCircle, PersonX, XCircle } from 'react-bootstrap-icons';
import { logoutUser } from '../../../redux/authSlice';

const ChangePassword = () => {
    const info = useSelector((state) => state.auth.info);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showNoDelete, setShowNoDelete] = useState(false);
  
    const handleLogout = () => {
      dispatch(logoutUser());
    };
  

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

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch(config.API_USER_DELETE, {
                method: 'DELETE',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${user.Token}`,
                },
            });
            if (response.ok) {
                navigate('/');
                handleLogout();
            } else {
                const dataError = await response.json();
                if (dataError.error = 'In order to delete the account, you need to exit all projects') {
                    setShowNoDelete(true);
                }
            }
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className='container col-sm-12 col-md-4 my-4'>
            <div className='card p-4 pb-1 my-5 rounded-4 border-0 shadow-lg'>
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
                    <Form.Group className='row mt-3'>
                        <div className='col-12 col-md-4 text-md-end text-center card p-2 border-0'>
                            <p className='m-0 fw-bold'>Current Password:</p>
                        </div>
                        <div className='col-12 col-md-7 mx-2'>
                            <Form.Control
                                type='password'
                                name='currentPassword'
                                className='m-0 p-2 text-center'
                                value={passwordFormData.currentPassword}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className='row mt-3'>
                        <div className='col-12 col-md-4 text-md-end text-center card p-2 border-0'>
                            <p className='m-0 fw-bold'>New Password:</p>
                        </div>
                        <div className='col-12 col-md-7 mx-2'>
                            <Form.Control
                                type='password'
                                name='newPassword'
                                className='m-0 p-2 text-center'
                                value={passwordFormData.newPassword}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                    </Form.Group>

                    <div className='d-flex justify-content-center my-4'>
                        <Button variant='primary' type='submit' className='col-8'>
                            Change Password
                        </Button>
                    </div>
                </Form>
                <h2 className='text-center'>Delete Account</h2>

                <div className='d-flex justify-content-center my-4'>
                    <Button
                        variant='danger'
                        className='col-8'
                        onClick={handleShow}

                    >
                        <PersonX className='me-1 m-0 p-0 pb-1' size={25}></PersonX>
                        <span>Delete Account</span>
                    </Button>
                    <Modal show={show} onHide={handleClose} animation={true} aria-labelledby='contained-modal-title-vcenter' centered>
                        <Modal.Body className='text-center'>
                            <XCircle className='text-danger my-4' size={100}></XCircle>
                            <h2>Are You Sure?</h2>
                            <p>Your account and all its data will be permanently deleted!</p>
                            <Container className='mt-4 mb-2'>
                                <Button variant='secondary' onClick={handleClose} className='col-4 mx-3'>
                                    No
                                </Button>
                                <Button
                                    variant='danger'
                                    onClick={(e) => {
                                        handleClose();
                                        handleDeleteAccount();
                                    }}
                                    className='col-4 mx-3'
                                >
                                    Yes
                                </Button>
                            </Container>
                        </Modal.Body>
                    </Modal>
                    <Modal show={showNoDelete} onHide={() => setShowNoDelete(false)} animation={true} aria-labelledby='contained-modal-title-vcenter' centered>
                        <Modal.Body className='text-center'>
                            <ExclamationCircle className='text-danger my-4' size={100}></ExclamationCircle>
                            <h2>Action is not possible!</h2>
                            <p>In order to delete the account, you need to exit all projects.</p>
                            <Container className='mt-4 mb-2'>
                                <Button variant='danger' onClick={() => setShowNoDelete(false)} className='col-4 mx-3'>
                                    Ok
                                </Button>
                            </Container>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;