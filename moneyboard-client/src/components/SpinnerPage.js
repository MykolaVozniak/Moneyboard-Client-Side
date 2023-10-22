import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

const SpinnerPage = () => {
    return (
        <>
            <div className='h-100'>
                <Container className='h-100'>
                    <Row className='h-100'>
                        <Col xs={12} className='d-flex align-items-center justify-content-center'>
                            <Spinner animation="border" variant="info" style={{ width: '5rem', height: '5rem', borderWidth: '0.5rem' }} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default SpinnerPage;