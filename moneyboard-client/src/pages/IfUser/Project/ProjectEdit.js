import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import RolesNPoints from '../../../components/ProjectEditComponents/RolesNPoints';
import ProjectNCard from '../../../components/ProjectEditComponents/ProjectNCard';
import { useSelector } from 'react-redux';
import config from '../../../config';
import { FolderX, XCircle } from 'react-bootstrap-icons';

const ProjectEdit = () => {
    const { projectId } = useParams();
    const user = useSelector((state) => state.auth.user);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    if (data.IsOwner !== true) {
                        navigate(`/workspace`);
                    }
                    setError(null);
                } else {
                    const dataError = await response.json();
                    setError(dataError.error);
                    navigate(`/workspace`);
                }
            } catch (error) {
                setError(error);
            }
        };
        fetchProjectInfo();
    }, [projectId]);

    const handleDeleteProject = async () => {
        try {
            const response = await fetch(`${config.API_PROJECT_DELETE}${projectId}`, {
                method: 'DELETE',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${user.Token}`,
                },
            });
            if (response.ok) {
                navigate('/workspace');
            } else {
                const dataError = await response.json();
                setError(dataError.error);
            }
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div>
            <div className='h-100'>
                <Container className='h-100'>
                    <Row>
                        <Col xs={12} className='d-flex  flex-column flex-md-row justify-content-center'>
                            <Container className='bg-white border-0 rounded-4 shadow-lg px-5 py-4 mt-5 col-sm-12 col-md-5'>
                                <ProjectNCard></ProjectNCard>
                            </Container>
                            <Container className='bg-white border-0 rounded-4 shadow-lg px-5 py-4 mt-5 col-sm-12 col-md-5'>
                                <RolesNPoints projectId={projectId} buttonLink='' />
                            </Container>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className=" mt-5 mx-auto col-4">
                                <Button
                                    variant='danger'
                                    className='my-4 w-100'
                                    onClick={handleShow}

                                >
                                    <div className='mt-1'>
                                        <FolderX className='me-1 m-0 p-0 pb-1' size={25}></FolderX>
                                        <span>Delete Project</span>
                                    </div>
                                </Button>
                                <Modal show={show} onHide={handleClose} animation={true} aria-labelledby="contained-modal-title-vcenter" centered>
                                    <Modal.Body className='text-center'>
                                        <XCircle className='text-danger my-4' size={100}></XCircle>
                                        <h2>Are You Sure?</h2>
                                        <p>Your project and all its data will be permanently deleted for you and all other project participants.</p>
                                        <Container className='mt-4 mb-2'>
                                            <Button variant="secondary" onClick={handleClose} className='col-4 mx-3'>
                                                No
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={(e) => {
                                                    handleClose();
                                                    handleDeleteProject();
                                                }}
                                                className='col-4 mx-3'
                                            >
                                                Yes
                                            </Button>
                                        </Container>
                                    </Modal.Body>
                                </Modal>
                            </div>

                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default ProjectEdit;