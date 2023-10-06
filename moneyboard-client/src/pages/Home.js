import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import picture from '../resources/logo512.png';

class Home extends Component {
    render() {
        return (
            <>
                <Container>
                    <Row className='row align-items-center'>
                        <Col xs={12} md={6}>
                            <p className="fw-bold display-1">Moneyboard</p>
                            <h4 className='mt-4'>The best solution for money management</h4>
                            <Carousel controls={false}>
                                <Carousel.Item>
                                    <h4>Thesis 1</h4>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <h4>Thesis 2</h4>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <h4>Thesis 3</h4>
                                </Carousel.Item>
                            </Carousel>
                            <div className='d-flex justify-content-center mt-4'>
                                <Link to="/login">
                                    <Button variant="success" className="btn-lg">Get started!</Button>
                                </Link>
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div className='d-flex justify-content-center mt-4'>
                                <img
                                    src={picture}
                                    alt="picture"
                                    width="90%"
                                    className='d-flex justify-content-center'
                                />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Home;