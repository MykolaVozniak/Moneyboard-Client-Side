import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../resources/Logos/MbLogoCompact.png';
import { logoutUser } from '../redux/authSlice';

const Layout = () => {
  const [expanded, setExpanded] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className='d-flex flex-column vh-100'>
      <header className='mb-3'>
        <Navbar
          expanded={expanded}
          onToggle={() => setExpanded(!expanded)}
          fixed='top'
          expand='md'
          bg='dark'
          variant='dark'
          className='shadow px-3'
        >
          <Navbar.Brand as={Link} to='/'>
            <img
              src={logo}
              alt='MbLogo'
              height='30'
              className='d-inline-block align-top mx-2'
            />
            Moneyboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {user ? (
              <>
                <Nav className='col justify-content-start'>
                  <Nav.Link as={Link} to='/' onClick={() => setExpanded(false)}>Home</Nav.Link>
                  <Nav.Link as={Link} to='/workspace' onClick={() => setExpanded(false)}>Workspace</Nav.Link>
                </Nav>
                <Nav className='col justify-content-end'>
                  <Nav.Link as={Link} to='/account' onClick={() => setExpanded(false)}>My Account</Nav.Link>
                  <Nav.Link onClick={() => { handleLogout(); setExpanded(false); }} as={Link} to='/'>Logout</Nav.Link>
                </Nav>
              </>
            ) : (
              <>
                <Nav className='col justify-content-start'>
                  <Nav.Link as={Link} to='/' onClick={() => setExpanded(false)}>Home</Nav.Link>
                  <Nav.Link as={Link} to='/privacy' onClick={() => setExpanded(false)}>Privacy</Nav.Link>
                </Nav>
                <Nav className='col justify-content-end'>
                  <Nav.Link as={Link} to='/register' onClick={() => setExpanded(false)}>Register</Nav.Link>
                  <Nav.Link as={Link} to='/login' onClick={() => setExpanded(false)}>Login</Nav.Link>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Navbar>
      </header>

      <main className='flex-grow-1 bg-light'>
        <div className='py-4 h-100'>
          <div className='mx-4 my-4 text-lg h-100'>
            <Outlet />
          </div>
        </div>
      </main>

      <footer className='mt-2 '>
        <div className='text-center py-2 text-bg-dark'>
          <p className='m-0'><Link to='/ultrapoints' target='_blank'>About Ultrapoints System</Link></p>
          <p className='m-0'>&copy; 2023 - Moneyboard - <Link to='/privacy'>Privacy</Link></p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

