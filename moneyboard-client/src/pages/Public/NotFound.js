import React from 'react';
import picture from '../../resources/Fillers/frogCute.png';
import { Col, Container, Image, Row } from 'react-bootstrap';

const NotFound = () => {
    return (
        <div className='h-100'>
            <Container className='h-100'>
                <Row className='h-100'>
                    <Col xs={12} md={6} className='d-flex align-items-center justify-content-center'>
                        <Image
                            src={picture}
                            alt='picture'
                            width='75%'
                            fluid />
                    </Col>
                    <Col xs={12} md={6} className='d-flex align-items-center justify-content-center'>
                        <Container>
                            <h1>Oops! This Page Doesn't Exist</h1>
                            <p className='mt-4'>It seems that the page you were trying to access doesn't exist. Please check the URL and try again.</p>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default NotFound;