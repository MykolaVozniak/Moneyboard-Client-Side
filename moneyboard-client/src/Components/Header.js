import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
            <div>
                <Navbar>
                    <Container>
                        <Navbar.brand href='/'>
                            <img
                            src={}
                            height='30'
                            width='30'
                            className='d-inline-block align-top'
                            alt='MbLogo'
                            />
                        </Navbar.brand>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default Header;