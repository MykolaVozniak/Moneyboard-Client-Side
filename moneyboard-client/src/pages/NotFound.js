import React from 'react';
import picture from '../resources/Fillers/frogCute.png';
import { Col, Row } from 'react-bootstrap';

const NotFound = () => {
    return (
        <div className='container my-5 d-flex align-items-center justify-content-center'>
            <Row className='align-items-center my-4 h-100'>
                <Col xs={12} md={6} className='d-flex justify-content-center mt-4'>
                    <img
                        src={picture}
                        alt='picture'
                        width='80%'
                        className='d-flex justify-content-center'
                    />
                </Col>
                <Col xs={12} md={6} className='d-flex align-items-center'>
                    <div>
                        <h2 className='mb-4'>Oops! This Page Doesn't Exist</h2>
                        <p>It seems that the page you were trying to access doesn't exist. Please check the URL and try again.</p>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default NotFound;