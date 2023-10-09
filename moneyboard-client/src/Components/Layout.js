import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import logo from '../resources/logo192.png';

import { useAuth } from '../autentification/AuthContext';

const Layout = () => {
  const { isLoggedIn, logout} = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='d-flex flex-column vh-100'>
      <header>
        <Navbar fixed='top' expand='md' bg='dark' variant='dark' className='shadow px-3'>
          <Navbar.Brand as={Link} to='/'>
            <img
              src={logo}
              alt='MbLogo'
              height='30'
              width='30'
              className='d-inline-block align-top mx-2'
            />
            Moneyboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {isLoggedIn() ? (
              <>
                <Nav className='col justify-content-start'>
                  <Nav.Link as={Link} to='/workspace'>Workspace</Nav.Link>
                </Nav>
                <Nav className='col justify-content-end'>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
              </>
            ) : (
              <>
                <Nav className='col justify-content-start'>
                  <Nav.Link as={Link} to='/'>Home</Nav.Link>
                  <Nav.Link as={Link} to='/privacy'>Privacy</Nav.Link>
                </Nav>
                <Nav className='col justify-content-end'>
                  <Nav.Link as={Link} to='/register'>Register</Nav.Link>
                  <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Navbar>
      </header>

      <main className='flex-grow-1'>
        <div className='bg-white pt-5'>
          <div className='mx-4 my-3'>
            <Outlet />
          </div>
        </div>
      </main>

      <footer>
        <div className='text-center py-2 text-bg-dark'>
          &copy; 2023 - Moneyboard - <Link to='/privacy'>Privacy</Link>
        </div>
      </footer>
    </div>
  );
};

export default Layout;