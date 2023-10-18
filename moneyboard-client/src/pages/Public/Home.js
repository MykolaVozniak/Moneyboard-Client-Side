import { Container, Row, Col, Carousel, Button } from 'react-bootstrap';
import picture from '../../resources/Fillers/frog3.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <div className='h-100'>
            <Container>
                <Row className='align-items-center my-5 h-100'>
                    <Col xs={12} md={6} className='h-100'>
                        <p className='fw-bold display-1'>Moneyboard</p>
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
                        <div className='mt-4'>
                            {user ? (
                                <Link to='/workspace'>
                                    <Button variant='success' className='btn-lg'>Get to work!</Button>
                                </Link>
                            ) : (
                                <Link to='/login'>
                                    <Button variant='success' className='btn-lg'>Get started!</Button>
                                </Link>
                            )}
                        </div>
                    </Col>
                    <Col xs={12} md={6} className='h-100'>
                        <div className='d-flex justify-content-center mt-4'>
                            <img
                                src={picture}
                                alt='picture'
                                width='75%'
                                className='d-flex justify-content-center'
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;