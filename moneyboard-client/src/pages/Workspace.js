import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import { PlusSquare as IconForCreate } from 'react-bootstrap-icons';
import OwnerProjectsList from '../components/OwnerProjectsList';
import MemberProjectsList from '../components/MemberProjectsList';

const Workspace = () => {
  return (
    <>
      <Row className='row align-items-center h-100'>
        <Col xs={12} md={4} className="h-100">
          <div className="card rounded-4 border-0 shadow-lg bg-dark text-light h-100">
            <div className='px-5 pt-4'>
              <Row className='d-flex align-items-center'>
                <Col className='text-start'>
                  <h2>My Projects</h2>
                </Col>
                <Col className='text-end'>
                  <Link to='/project/create' className="text-decoration-none text-light">
                    <IconForCreate size={35}></IconForCreate>
                  </Link>
                </Col>
              </Row>
            </div>
            <hr className='mx-4' />
            <div className='px-5 pb-3'>
              <OwnerProjectsList />
              <MemberProjectsList />
            </div>
          </div>
        </Col>
        <Col xs={12} md={8} className="h-100">
          <div className="card p-4 rounded-4 border-0 shadow-lg h-100"></div>
        </Col>
      </Row>
    </>
  );
};

export default Workspace;