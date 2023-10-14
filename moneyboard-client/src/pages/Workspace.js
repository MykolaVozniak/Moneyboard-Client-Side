import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

const Workspace = () => {
  const isLoggedIn = useSelector((state) => state.auth.user);
  const info = useSelector((state) => state.auth.info);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="card p-4 my-4 rounded-4 border-0 shadow-lg">
      <Row className='row align-items-center'>
        <Col>
        <h2 className='text-center'>Hello, {info.Firstname}</h2>
        </Col>
        <Col>
        <h2 className='text-center'>Registration</h2>
        </Col>
      </Row>
      
    </div>

  );
};

export default Workspace;

//<p>Вітаємо, {isLoggedIn.RefreshToken}!</p>