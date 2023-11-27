import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import picture1 from '../../resources/Abouters/11.png';
import picture2 from '../../resources/Abouters/1.png';
import picture3 from '../../resources/Abouters/5.png';
import picture4 from '../../resources/Abouters/4.png';
import picture5 from '../../resources/Abouters/6.png';

const UltrapointsInfo = () => {
    return (
        <>
            <div className='h-100'>
                <Container className='h-100'>

                    <Row className='justify-content-center mt-5'>
                        <Col xs={12} md={8} className='d-flex'>
                            <Container>
                                <p className='fw-bold display-1 text-center'>Ultrapoints</p>
                                <h4 className='mt-4 text-center'>Base salary is good, but allowances are even better! Meet a brand new approach to calculating and paying allowances!</h4>
                            </Container>
                        </Col>
                    </Row>

                    <Row className='mt-5'>
                        <Col xs={12} md={6} className='d-flex align-items-center justify-content-center'>
                            <Container>
                                <h4 className='mt-4 fw-normal'>Ultrapoints can be assigned to a role, and each person with that role will be allocated the assigned number of ultrapoints.
                                </h4>
                            </Container>
                        </Col>
                        <Col xs={12} md={6} className='d-flex align-items-center justify-content-center'>
                            <Image
                                src={picture1}
                                alt='picture'
                                width='75%'
                                fluid />
                        </Col>
                    </Row>
                    <div><hr className='col-9' /></div>
                    <Row>
                        <Col xs={12} md={6} className='d-flex align-items-center justify-content-center'>
                            <Image
                                src={picture2}
                                alt='picture'
                                width='75%'
                                fluid />
                        </Col>
                        <Col xs={12} md={6} className='d-flex align-items-center justify-content-center'>
                            <Container>
                                <h4 className='mt-4 fw-normal'>Ultrapoints can also be assigned to individuals directly. In this case, the personal ultrapoints and role ultrapoints of a particular participant will be added up.</h4>
                            </Container>
                        </Col>
                    </Row>
                    <div className='d-flex justify-content-end'><hr className='col-9' /></div>
                    <Row>
                        <Col xs={12} md={6} className='d-flex align-items-center justify-content-center'>
                            <Container>
                                <h4 className='mt-4 fw-normal'>The personal ultrapoints and role ultrapoints of each project participant form total amount of ultrapoints.</h4>
                            </Container>
                        </Col>
                        <Col xs={12} md={6} className='d-flex align-items-center justify-content-center'>
                            <Image
                                src={picture3}
                                alt='picture'
                                width='75%'
                                fluid />
                        </Col>
                    </Row>
                    <div><hr className='col-9' /></div>
                    <Row>
                        <Col xs={12} md={6} className='d-flex align-items-center justify-content-center'>
                            <Image
                                src={picture4}
                                alt='picture'
                                width='75%'
                                fluid />
                        </Col>
                        <Col xs={12} md={6} className='d-flex align-items-center justify-content-center'>
                            <Container>
                                <h4 className='mt-4 fw-normal'>You can reserve from 0% to 100% of the amount remaining on the project card balance after all base salaries have been paid.</h4>
                            </Container>
                        </Col>
                    </Row>
                    <div className='d-flex justify-content-end'><hr className='col-9' /></div>
                    <Row>
                        <Col xs={12} md={6} className='d-flex align-items-center justify-content-center'>
                            <Container>
                                <h4 className='mt-4 fw-normal'>When paying allowances, the amount of money reserved for the payment of ultrapoints is distributed among all project participants in accordance with their share of ultrapoints in the project.</h4>
                            </Container>
                        </Col>
                        <Col xs={12} md={6} className='d-flex align-items-center justify-content-center'>
                            <Image
                                src={picture5}
                                alt='picture'
                                width='75%'
                                fluid />
                        </Col>
                    </Row>
                    <div><hr className='col-9' /></div>
                    <Row className='justify-content-center my-5'>
                        <Col xs={12} md={8} className='d-flex align-items-center justify-content-center mt-3'>
                            <Container>
                                <h4 className='mt-4 text-center'>The ultrapoint system allows you to keep a fixed percentage of payments between participants, regardless of the amount of money allocated for the payment of ultrapoints.</h4>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default UltrapointsInfo;