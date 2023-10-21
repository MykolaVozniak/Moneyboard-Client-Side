import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Privacy = () => {
    return (
        <div className='h-100'>
            <Container className='h-100'>
                <Row className='h-100'>
                    <Col xs={12} className='d-flex align-items-center justify-content-center'>
                        <Container className='bg-white border-0 rounded-4 shadow-lg p-5 col-sm-12 col-md-9'>
                            <Container className='col-sm-12 col-md-10'>
                                <h1 className='text-center'>Privacy Policy</h1>
                                <h4 className='mt-5'>Moneyboard privacy policy</h4>
                                <p>Your privacy is important to us. Our privacy policy provides you with information about how we collect, use, and protect your personal information when you use the Moneyboard website and its services.</p>
                                <h4 className='mt-4'>Collection and use of information</h4>
                                <p>We collect information that you provide to us when you register for an account on Moneyboard, including your name, email address, and contact information. We use this information to provide you with access to the features and functionality of our service.</p>
                                <h4 className='mt-4'>Protection of personal information</h4>
                                <p>We use our best efforts to protect your personal information from unauthorized access, loss, and unlawful use. However, by using our website, you understand and accept that you bear all risks of possible loss of data or other information.</p>
                                <h4 className='mt-4'>Disclosure of information to third parties</h4>
                                <p>We do not disclose your personal information to third parties without your permission, except as required by law.</p>
                                <h4 className='mt-4'>Use of cookies</h4>
                                <p>Moneyboard may use cookies to improve your user experience and provide you with personalized content.</p>
                                <h4 className='mt-4'>Changes to this Privacy Policy</h4>
                                <p>We may update this privacy policy from time to time. Please check this page periodically to stay informed of changes.</p>
                                <p className='mt-5 text-center'>If you have any questions or comments regarding our privacy policy, please contact us at moneyboard@example.com <span className='small fw-semibold'>( ◠‿◠)/</span></p>
                            </Container>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Privacy;