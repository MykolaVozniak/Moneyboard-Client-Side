import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PlusSquare as IconForCreate } from 'react-bootstrap-icons';
import OwnerProjectsList from '../../components/Lists/OwnerProjectsList';
import MemberProjectsList from '../../components/Lists/MemberProjectsList';
import { useSelector } from 'react-redux';
import SpinnerPage from '../../components/SpinnerPage';

const Workspace = () => {
  const isProjectListExist = useSelector((state) => state.auth.isProjectsExist);

  return (
      <Row className='h-100'>
        <Col xs={12} md={4} className='h-100'>
          <div className='card rounded-4 border-0 shadow-lg bg-dark text-light h-100'>
            <div className='px-5 pt-4'>
              <Row className='d-flex align-items-center'>
                <Col className='text-start'>
                  <h2>My Projects</h2>
                </Col>
                <Col className='text-end'>
                  <Link to='/project/create/0' className='text-decoration-none text-light'>
                    <IconForCreate size={33}></IconForCreate>
                  </Link>
                </Col>
              </Row>
            </div>
            <hr className='mx-4' />
            <div className='px-5 pb-5 h-100'>
              <OwnerProjectsList />
              <MemberProjectsList />
              {!isProjectListExist && (
                <div className='h-100 d-flex align-items-center justify-content-center'>
                  <h5 className='text-light fst-italic text-opacity-50'>You are not involved in any project yet...</h5>
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col xs={12} md={8} className='h-100'>
          <div className='card p-4 rounded-4 border-0 shadow-lg h-100'></div>
        </Col>
      </Row>
  );
};

export default Workspace;