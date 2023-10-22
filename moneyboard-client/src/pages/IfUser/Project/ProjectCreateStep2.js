import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import config from "../../../config"
import { Button, Card, Col, Container, Form, FormControl, FormSelect, InputGroup, Row } from "react-bootstrap";

const ProjectCreateStep2 = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [projectInfo, setProjectInfo] = useState(null);
    const user = useSelector((state) => state.auth.user);
    const { projectId } = useParams();

    const [roles, setRoles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                } else {
                    console.error('Error fetching project info:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching project info:', error);
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
                } else {
                    console.error('Error fetching roles:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
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
            const response = await fetch(`${config.API_ROLE_EDIT}`, {
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
                setError(null);
                // Do something on success
            } else {
                const dataError = await response.json();
                setError(dataError.error);
                console.error(dataError.error);
            }
        } catch (error) {
            console.error(error);
            setError(error);
        }

        setIsSubmitting(false);
    };

    const handleSubmit = () => {
        roles.forEach(role => {
            handleSubmitRole(role);
        });
    };

    if (!projectInfo) {
        return <div>Loading...</div>;
    }

    if (projectInfo.IsOwner !== true) {
        navigate(`/workspace`);
    }

    return (
        <div>
            <div className='container col-sm-12 col-md-4 my-4'>
                <div className="card p-4 pb-1 my-5 rounded-4 border-0 shadow-lg">
                    <h1 className='text-center'>{projectInfo.Name}</h1>
                    <h2 className='text-center'>Add Roles to your project</h2>
                    <Form>
                        <Container className="sm-col-12 md-col-11 px-sm-0 px-md-4">
                            <ul>
                                {roles.map((role, index) => (
                                    <li key={index}>
                                        <div className='d-flex justify-content-center my-3'>
                                            <InputGroup>
                                                <InputGroup.Text className='w-50'>Role Name:</InputGroup.Text>
                                                <FormControl
                                                    type="text"
                                                    name="roleName"
                                                    className="form-control"
                                                    placeholder="Role Name"
                                                    value={role.RoleName}
                                                    onChange={(e) => handleRoleChange(e, index, 'RoleName')}
                                                    required
                                                />
                                            </InputGroup>
                                        </div>
                                        <div className='d-flex justify-content-center my-3'>
                                            <InputGroup>
                                                <InputGroup.Text className='w-50'>Role Points:</InputGroup.Text>
                                                <FormControl
                                                    type="number"
                                                    name="rolePoints"
                                                    className="form-control"
                                                    value={role.RolePoints}
                                                    onChange={(e) => handleRoleChange(e, index, 'RolePoints')}
                                                    required
                                                />
                                            </InputGroup>
                                        </div>
                                        <strong> Is Default:</strong> {role.IsDefolt ? 'Yes' : 'No'}
                                    </li>
                                ))}
                            </ul>
                        </Container>
                        <div className='d-flex justify-content-center my-3'>
                            <Button
                                type='button'
                                className='btn btn-primary col-8'
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                Create
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ProjectCreateStep2;