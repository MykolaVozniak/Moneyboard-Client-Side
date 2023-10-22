import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import config from "../../../config"
import { Badge, Button, Card, Col, Container, Form, FormControl, FormSelect, InputGroup, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import SpinnerPage from '../../../components/SpinnerPage';
import { Link } from 'react-router-dom';
import { App, LockFill, Plus, PlusLg, XCircle } from 'react-bootstrap-icons';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';

const ProjectCreateStep2 = () => {
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const [projectInfo, setProjectInfo] = useState(null);
    const user = useSelector((state) => state.auth.user);
    const { projectId } = useParams();

    const [roles, setRoles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const criticalError = 'Unknown critical error';

    const [projectPoinPercent, setProjectPoinPercent] = useState(0);

    const handleUpdateProjectPoint = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch(`${config.API_PROJECT_POINT}${projectId}`, {
                method: 'PUT',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${user.Token}`,
                    'Content-Type': 'application/json-patch+json',
                },
                body: JSON.stringify({ projectPoinPercent }),
            });

            if (response.ok) {
                setErrors([]);
            } else {
                const dataError = await response.json();
                if (!errors.includes(dataError.error)) {
                    setErrors(prevErrors => [...prevErrors, dataError.error]);
                }
            }
        } catch (error) {
            if (!errors.includes(criticalError)) {
                setErrors(prevErrors => [...prevErrors, criticalError]);
            }
        }
        setIsSubmitting(false);
    };

    useEffect(() => {
        const fetchProjectInfo = async () => {
            try {
                const response = await fetch(`${config.API_PROJECT_INFO}${projectId}`, {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${user.Token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setProjectInfo(data);
                    setProjectPoinPercent(data.ProjectPoinPercent)
                    setErrors([]);
                } else {
                    const dataError = await response.json();
                    if (!errors.includes(dataError.error)) {
                        setErrors(prevErrors => [...prevErrors, dataError.error]);
                    }
                }
            } catch (error) {
                if (!errors.includes(criticalError)) {
                    setErrors(prevErrors => [...prevErrors, criticalError]);
                }
            }
        };

        fetchProjectInfo();
    }, [projectId]);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch(`${config.API_ROLE_PROJECT}${projectId}`, {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${user.Token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setRoles(data);
                    setErrors([]);
                } else {
                    const dataError = await response.json();
                    if (!errors.includes(dataError.error)) {
                        setErrors(prevErrors => [...prevErrors, dataError.error]);
                    }
                }
            } catch (error) {
                if (!errors.includes(criticalError)) {
                    setErrors(prevErrors => [...prevErrors, criticalError]);
                }
            }
        };
        fetchRoles();
    }, [projectId]);

    const handleRoleChange = (e, index, field) => {
        const updatedRolesCopy = [...roles];
        updatedRolesCopy[index][field] = e.target.value;
        setRoles(updatedRolesCopy);
    };

    const handleSubmitRole = async (role) => {
        setIsSubmitting(true);
        try {
            const response = await fetch(`${config.API_ROLE_EDIT}${projectId}`, {
                method: 'PUT',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${user.Token}`,
                    'Content-Type': 'application/json-patch+json',
                },
                body: JSON.stringify(role),
            });
            console.log(JSON.stringify(role));

            if (response.ok) {
                setErrors([]);
            } else {
                const dataError = await response.json();
                if (!errors.includes(dataError.error)) {
                    setErrors(prevErrors => [...prevErrors, dataError.error]);
                }
            }
        } catch (error) {
            if (!errors.includes(criticalError)) {
                setErrors(prevErrors => [...prevErrors, criticalError]);
            }
        }
        setIsSubmitting(false);
    };

    const handleSubmit = () => {
        roles.forEach(role => {
            handleSubmitRole(role);
        });
    };

    const handleCreateRole = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch(`${config.API_ROLE_CREATE}${projectId}`, {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${user.Token}`,
                    'Content-Type': 'application/json-patch+json',
                },
                body: JSON.stringify({}),
            });

            if (response.ok) {
                setErrors([]);
                updateRolesList();
            } else {
                const dataError = await response.json();
                if (!errors.includes(dataError.error)) {
                    setErrors(prevErrors => [...prevErrors, dataError.error]);
                }
            }
        } catch (error) {
            if (!errors.includes(criticalError)) {
                setErrors(prevErrors => [...prevErrors, criticalError]);
            }
        }

        setIsSubmitting(false);
    };

    const updateRolesList = async () => {
        try {
            const response = await fetch(`${config.API_ROLE_PROJECT}${projectId}`, {
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${user.Token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setRoles(data);
                setErrors([]);
            } else {
                const dataError = await response.json();
                if (!errors.includes(dataError.error)) {
                    setErrors(prevErrors => [...prevErrors, dataError.error]);
                }
            }
        } catch (error) {
            if (!errors.includes(criticalError)) {
                setErrors(prevErrors => [...prevErrors, criticalError]);
            }
        }
    };

    const handleDeleteRole = async (roleId) => {
        setIsSubmitting(true);
        try {
            const response = await fetch(`${config.API_ROLE_DELETE}${roleId}`, {
                method: 'DELETE',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${user.Token}`,
                },
            });

            if (response.ok) {
                setErrors([]);
                updateRolesList();
            } else {
                const dataError = await response.json();
                if (!errors.includes(dataError.error)) {
                    setErrors(prevErrors => [...prevErrors, dataError.error]);
                }
            }
        } catch (error) {
            if (!errors.includes(criticalError)) {
                setErrors(prevErrors => [...prevErrors, criticalError]);
            }
        }
        setIsSubmitting(false);
    };


    if (!projectInfo) {
        return <SpinnerPage />;
    }

    if (projectInfo.IsOwner !== true) {
        navigate(`/workspace`);
    }

    return (
        <>
            <div className='h-100'>
                <Container className='h-100'>
                    <Row>
                        <Col xs={12} className='d-flex align-items-center justify-content-center'>
                            <Container className='bg-white border-0 rounded-4 shadow-lg px-5 py-4 mt-5 col-sm-12 col-md-5'>
                                <h2 className='text-center'>Build the Role List for Your Project</h2>
                                <Container className="col-sm-12 col-md-11 p-0"> {/*p-0*/}
                                    {errors.length > 0 && (
                                        <div className='card rounded-2 p-2 mt-4 border-danger'>
                                            {errors.map((error, index) => (
                                                <div key={index}>
                                                    <div style={{ whiteSpace: 'pre-line' }} className='text-danger'>
                                                        {'! ' + error}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <Form onSubmit={handleSubmit}>
                                        <Row className='mt-3'>
                                            <Col xs={10} className='ps-3 pe-1'>
                                                <InputGroup>
                                                    <InputGroup.Text className='w-50'>Role Name</InputGroup.Text>
                                                    <InputGroup.Text className='w-50'>Role Ultrapoints</InputGroup.Text>
                                                </InputGroup>
                                            </Col>
                                            <Col xs={2} className='ps-1 pe-3'>
                                                <InputGroup>
                                                    <InputGroup.Text className='d-flex justify-content-center w-100'>
                                                        <App size={24} className='text-bg-light text-opacity-25 text-secondary'></App>
                                                    </InputGroup.Text>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <ul className='p-0'>
                                            {roles.map((role, index) => (
                                                <li key={index} className="list-unstyled">
                                                    <Row>
                                                        <Col xs={10} className='ps-3 pe-1'>
                                                            <InputGroup className="mt-2">
                                                                <FormControl
                                                                    type="text"
                                                                    name="roleName"
                                                                    placeholder="Role Name"
                                                                    className="form-control"
                                                                    value={role.RoleName}
                                                                    onChange={(e) => handleRoleChange(e, index, 'RoleName')}
                                                                    required
                                                                />
                                                                <FormControl
                                                                    type="number"
                                                                    name="rolePoints"
                                                                    className="form-control"
                                                                    value={role.RolePoints}
                                                                    onChange={(e) => handleRoleChange(e, index, 'RolePoints')}
                                                                    required
                                                                />
                                                            </InputGroup>
                                                        </Col>
                                                        <Col xs={2} className='ps-1 pe-3'>
                                                            <OverlayTrigger
                                                                placement="top"
                                                                overlay={<Tooltip id="tooltip-copied">{role.IsDefolt !== null ? (role.IsDefolt ? 'This is a role for the project owner. Removal is not possible!' : 'This role is for newly arrived people. Removal is not possible!') : 'Click to delete'}</Tooltip>}
                                                            >
                                                                <Button
                                                                    className="mt-2 d-flex justify-content-center w-100"
                                                                    variant={role.IsDefolt === null ? 'danger' : 'warning'}
                                                                    onClick={() => role.IsDefolt === null && handleDeleteRole(role.RoleId)}
                                                                >
                                                                    {role.IsDefolt === null ? <XCircle size={24} /> : <LockFill size={24} />}
                                                                </Button>
                                                            </OverlayTrigger>
                                                        </Col>
                                                    </Row>
                                                </li>
                                            ))}
                                        </ul>
                                        <Button variant="success" onClick={handleCreateRole} className='mt-2 d-flex justify-content-center w-100'><Plus size={24} />New Role</Button>

                                        <h2 className='text-center mt-4'>Set the Ultrapoint Percentage for Your Project</h2>
                                        <Card className='d-inline-block p-2 mt-2 d-flex justify-content-center border-0'>
                                            <p className='text-center m-0'>
                                                <div className='d-inline-block col-3 me-2'>
                                                    <FormControl
                                                        type="number"
                                                        name="projectPoinPercent"
                                                        placeholder="Project Point Percent"
                                                        className='form-control text-center  px-0 ps-3'
                                                        value={projectPoinPercent}
                                                        onChange={(e) => setProjectPoinPercent(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                % of the card's remaining balance will be allocated for the payment of Ultrapoints.
                                            </p>
                                        </Card>

                                        <Button
                                            type='submit'
                                            variant="primary"
                                            className='mt-4 d-flex justify-content-center w-100'
                                            onClick={() => {
                                                handleSubmit();
                                                handleUpdateProjectPoint();
                                            }}
                                            disabled={isSubmitting}>Save Changes
                                        </Button>

                                        <div className='mt-2 m-0 p-0'>
                                            <p className='text-center m-0'>Not sure what to do? Learn more about the</p>
                                            <p className='text-center m-0'><Link to='/ultrapoints' target='_blank'>Ultrapoints system.</Link></p>
                                        </div>
                                    </Form>
                                </Container>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default ProjectCreateStep2;