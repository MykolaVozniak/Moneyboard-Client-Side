import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import config from "../../config";
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SpinnerPage from '../../components/SpinnerPage';

const Invite = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [projectInfo, setProjectInfo] = useState(null);
    const user = useSelector((state) => state.auth.user);
    const { projectId } = useParams();

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
                    setError(null);
                    setProjectInfo(data);
                } else {
                    const dataError = await response.json();
                    setError(dataError.error);
                }
            } catch (error) {
                setError(error);
            }
        };
        fetchProjectInfo();
    }, [projectId]);

    const handleApply = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${config.API_PROJECT_ADD_MEMBER}${projectId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json-patch+json',
                    'Authorization': `Bearer ${user.Token}`,
                },
            });
            console.log(`${config.API_PROJECT_ADD_MEMBER}${projectId}`);

            if (response.ok) {
                setError(null);
                navigate(`/project/${projectId}`);
            } else {
                const dataError = await response.json();
                setError(dataError.error);
                //console.error(dataError.error);
            }
        } catch (error) {
            //console.error(error);
            setError(error);
        }
    };

    if (!projectInfo) {
        return <SpinnerPage/>;
    }

    if (projectInfo.IsOwner !== null) {
        navigate(`/project/${projectId}`);
    }

    return (
        <>
            <div className='h-100'>
                <Container className='h-100'>
                    <Row>
                        <Col xs={12} className='d-flex align-items-center justify-content-center'>
                            <Container className='bg-white border-0 rounded-4 shadow-lg px-5 py-4 m-5 col-sm-12 col-md-6'>
                                <h2 className='text-center'>Invitation to the "{projectInfo.Name}"</h2>
                                <p className='text-center text-muted mt-2'>By {projectInfo.OwnerName}</p>
                                <span ><Image src={projectInfo.OwnerURL} roundedCircle height='25' className='mb-1 border border-1'/></span>
                                <span ><Image src={`https://localhost:44339/images/users/${projectInfo.OwnerURL}`} roundedCircle height='25' className='mb-1 border border-1'/></span>
                                <Container className="mt-4">
                                    <p className='mt-4'>Project Currency: {projectInfo.Currency}.</p>
                                    <p>Base Salary: {projectInfo.BaseSalary} {projectInfo.Currency} / month.</p>
                                    <p>Payday: {projectInfo.PayDay} day of every month.</p>
                                    <Row>
                                        <Col>
                                            <div className='d-flex justify-content-center mt-4'>
                                                <Button variant="success" className='col-12' onClick={handleApply}>Apply</Button>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className='d-flex justify-content-center mt-4'>
                                                <Link to='/workspace' className='btn btn-danger col-12'>
                                                    Ignore
                                                </Link>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                                
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>

    );
};

export default Invite;