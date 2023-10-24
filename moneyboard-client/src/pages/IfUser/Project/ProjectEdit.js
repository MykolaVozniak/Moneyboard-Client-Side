import React from 'react';
import { useParams } from 'react-router';
import { Col, Container, Row } from "react-bootstrap";
import RolesNPoints from '../../../components/ProjectEditComponents/RolesNPoints';

const ProjectEdit = () => {
    const { projectId } = useParams();
    return (
        <div>
            <div className='h-100'>
                <Container className='h-100'>
                    <Row>
                        <Col xs={12} className='d-flex align-items-center justify-content-center'>
                            <Container className='bg-white border-0 rounded-4 shadow-lg px-5 py-4 mt-5 col-sm-12 col-md-5'>
                                <RolesNPoints projectId={projectId} buttonLink=''/>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default ProjectEdit;