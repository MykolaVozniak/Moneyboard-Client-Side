import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom';

import logo from '../resources/logo192.png';
import Home from '../pages/Home';
import Privacy from '../pages/Privacy';
import Register from '../pages/Register';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';


class Header extends Component {
  render() {
    return (
      <>
        <Router>
          
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

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Routes>

        </Router>
      </>
    );
  }
}

export default Header;


