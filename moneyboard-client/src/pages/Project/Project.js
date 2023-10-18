import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { CaretRight, CaretRightFill, Hexagon, HexagonFill, PencilSquare, PersonAdd } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { useParams, Link, Navigate } from 'react-router-dom';

const Project = () => {
    const [projectInfo, setProjectInfo] = useState(null);
    const user = useSelector((state) => state.auth.user);
    const { projectId } = useParams();

    useEffect(() => {
        const fetchProjectInfo = async () => {
            try {
                const response = await fetch(`https://localhost:44339/api/Project/info/${projectId}`, {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${user.Token}`
                    }
                });
                console.log(projectId);
                if (response.ok) {
                    const data = await response.json();
                    setProjectInfo(data);
                } else {
                    console.error('Error fetching project info:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching project info:', error);
            }
        };

        fetchProjectInfo();
    }, [projectId]);

    if (!projectInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className='h-100'>
            <Row className='row align-items-center my-4 h-100'>
                <Col xs={12} md={4} className="h-100">
                    <div className="card rounded-4 border-0 shadow-lg bg-dark text-light  h-100">
                        <div className='px-5 pt-4'>
                            <Row className='d-flex align-items-center'>
                                <Col xs={9} className='text-start'>
                                    <h2>{projectInfo.Name}</h2>
                                </Col>
                                {projectInfo.IsOwner && (
                                    <Col xs={3} className='text-end'>
                                        <Link to='/project/create' className="text-decoration-none text-light">
                                            <PencilSquare size={35}></PencilSquare>
                                        </Link>
                                    </Col>
                                )}
                            </Row>
                        </div>
                        <hr className='mx-4' />
                        <div className='px-5 pb-3'>
                            {[
                                { label: 'Project ID', value: projectInfo.ProjectId },
                                { label: 'Currency', value: projectInfo.Currency },
                                { label: 'Base Salary', value: projectInfo.BaseSalary },
                                { label: 'Salary Date', value: projectInfo.SalaryDate },
                                //{ label: 'Is Owner', value: projectInfo.IsOwner ? 'Yes' : 'No' },
                            ].map(item => (
                                <div key={item.label} className='ms-0 m-1 mt-2'>
                                    <CaretRightFill className='me-1 pb-2' size={35}></CaretRightFill>
                                    <h5 className='fw-semibold d-inline'>{`${item.label}: ${item.value}`}</h5>
                                </div>
                            ))}
                        </div>
                        <div className='h-100 d-flex justify-content-center'>
                            {projectInfo.IsOwner && (
                                <Link to='/project/create' className="text-decoration-none text-light mt-auto mx-auto col-8">
                                    <Button variant='success' className='btn-lg my-4 w-100'><PersonAdd className='me-1 m-0 p-0 pb-2' size={40}></PersonAdd> Add Members</Button>             
                                </Link>
                            )}
                        </div>
                    </div>
                </Col>
                <Col xs={12} md={8} className="h-100">
                    <div className="card p-4 rounded-4 border-0 shadow-lg h-100"></div>
                </Col>
            </Row>
        </div>
    );
};

export default Project;