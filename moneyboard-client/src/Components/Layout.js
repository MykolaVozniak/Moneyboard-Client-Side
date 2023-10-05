import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import logo from '../resources/logo192.png';

class Layout extends Component {
  render() {
    return (
      <>
        <header>
          <Navbar expand='md' bg='dark' variant='dark' className='mx-0 px-3 border-bottom shadow-sm'>
            <div className='container-fluid mx-0 px-0'>
              <Navbar.Brand as={Link} to='/'>
                <img
                  src={logo}
                  height='30'
                  width='30'
                  className='d-inline-block align-top mx-1'
                  alt='MbLogo'
                /> Moneyboard
              </Navbar.Brand>
              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='col justify-content-start'>
                  <Nav.Link as={Link} to='/'>Home</Nav.Link>
                  <Nav.Link as={Link} to='/privacy'>Privacy</Nav.Link>
                </Nav>
                <Nav className='col justify-content-end'>
                  <Nav.Link as={Link} to='/register'>Register</Nav.Link>
                  <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </div>
          </Navbar>
        </header>

        <Outlet />

        <footer>2023</footer>
      </>
    );
  }
}

export default Layout;


