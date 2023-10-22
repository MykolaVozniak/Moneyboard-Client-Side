import { Container, Row, Col, Carousel, Button, CarouselItem, Image } from 'react-bootstrap';
import picture from '../../resources/Fillers/frog3.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
    const user = useSelector((state) => state.auth.user);
    return (
        <>
            <div className='h-100'>
                <Container className='h-100'>
                    <Row className='h-100'>
                        <Col xs={12} md={6} className='d-flex align-items-center justify-content-center'>
                            <Container>
                                <p className='fw-bold display-1'>Moneyboard</p>
                                <h4 className='mt-4'>The best solution for money management</h4>
                                <Carousel controls={false}>
                                    <CarouselItem>
                                        <h4>Thesis 1</h4>
                                    </CarouselItem>
                                    <CarouselItem>
                                        <h4>Thesis 2</h4>
                                    </CarouselItem>
                                    <CarouselItem>
                                        <h4>Thesis 3</h4>
                                    </CarouselItem>
                                </Carousel>
                                <div className='mt-4 w-100'>
                                    {user ? (
                                        <Link to='/workspace'>
                                            <Button variant='success' size="lg">Get to work!</Button>
                                        </Link>
                                    ) : (
                                        <Link to='/login'>
                                            <Button variant='success' size="lg">Get started!</Button>
                                        </Link>
                                    )}
                                </div>
                            </Container>
                        </Col>
                        <Col xs={12} md={6} className='d-flex align-items-center justify-content-center'>
                            <Image
                                src={picture}
                                alt='picture'
                                width='75%'
                                fluid />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Home;