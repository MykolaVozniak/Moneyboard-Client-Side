import React, { useState, useEffect, useCallback } from 'react';
import { Button, Card, Col, Container, Modal, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';
import { CaretRightFill, DoorOpen, DoorOpenFill, ExclamationTriangle, Link45deg, PencilSquare, X, XCircle, XLg, XSquare } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import config from "../../../config"
import CopyToClipboard from 'react-copy-to-clipboard';
import SpinnerPage from '../../../components/SpinnerPage';

const ProjectId = () => {
    const [projectInfo, setProjectInfo] = useState(null);
    const user = useSelector((state) => state.auth.user);
    const { projectId } = useParams();
    const invitePath = `${window.location.origin}/invite/${projectId}`;
    const [error, setError] = useState(null);
    const [totalSalaryData, setTotalSalaryData] = useState(null);

    const [showNotEnoughModal, setShowNotEnoughModal] = useState(false);

    const [tooltipVisible, setTooltipVisible] = useState(false);
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCopyClick = () => {
        setTooltipVisible(true);
        setTimeout(() => {
            setTooltipVisible(false);
        }, 2000);
    };

    useEffect(() => {
        const fetchProjectInfo = async () => {
            try {
                const response = await fetch(`${config.API_PROJECT_DETAILS}${projectId}`, {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${user.Token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setProjectInfo(data);
                } else {
                    const dataError = await response.json();
                    setError(dataError.error);
                    console.log(error);
                    navigate(`/NotFound`);
                }
            } catch (error) {
                setError(error);
            }
        };

        fetchProjectInfo();
    }, [projectId]);

    useEffect(() => {
        const fetchProjectInfo = async () => {
            try {
                const response = await fetch(`${config.API_PROJECT_CALCULATE_TOTAL_PAYMENTS}${projectId}`, {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${user.Token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setError(null);
                    setTotalSalaryData(data);
                    if (data.IsEnough == true){
                        setShowNotEnoughModal(true);
                    }
                } else {
                    const dataError = await response.json();
                    setError(dataError.error);
                }
            } catch (error) {
                setError(error);
            }
        };
        fetchProjectInfo();
    }, [projectId]);


    const handleLeaveProject = async () => {
        try {
            const response = await fetch(`${config.API_PROJECT_LEAVE}${projectId}`, {
                method: 'DELETE',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${user.Token}`,
                },
            });
            if (response.ok) {
                navigate('/workspace');
            } else {
                const dataError = await response.json();
                setError(dataError.error);
            }
        } catch (error) {
            setError(error);
        }
    };

    if (!projectInfo) {
        return <SpinnerPage />;
    }

    if (!totalSalaryData) {
        return <SpinnerPage />;
    }

    return (
        <Row className='h-100'>
            <Col xs={12} md={4} className="h-100">
                <div className="card rounded-4 border-0 shadow-lg bg-dark text-light  h-100">
                    <div className='px-5 pt-4'>
                        <Row className='d-flex align-items-center'>
                            <Col xs={9} className='text-start'>
                                <h2>{projectInfo.Name}</h2>
                            </Col>
                            {projectInfo.IsOwner && (
                                <Col xs={3} className='text-end'>
                                    <Link to={`/project/edit/${projectId}`} className="text-decoration-none text-light">
                                        <PencilSquare size={33}></PencilSquare>
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
                            { label: 'Members', value: projectInfo.Members.length },
                            //{ label: 'Is Owner', value: projectInfo.IsOwner ? 'Yes' : 'No' },
                        ].map(item => (
                            <div key={item.label} className='ms-0 m-1 mt-2'>
                                <CaretRightFill className='me-1 pb-2' size={25}></CaretRightFill>
                                <h5 className='fw-semibold d-inline'>{`${item.label}: ${item.value}`}</h5>
                            </div>
                        ))}
                    </div>
                    <div className='h-100 d-flex justify-content-center'>
                        {projectInfo.IsOwner && (
                            <div className=" mt-auto mx-auto col-8">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip id="tooltip-copied">Copied Successfully!</Tooltip>}
                                    show={tooltipVisible}
                                >
                                    <CopyToClipboard text={invitePath}>
                                        <Button
                                            variant='success'
                                            className='btn-lg my-4 w-100'
                                            onClick={handleCopyClick}
                                        >
                                            <div className='mt-1'>
                                                <Link45deg className='me-1 m-0 p-0 pb-1' size={38}></Link45deg>
                                                <span>Add Members via Link</span>
                                            </div>
                                        </Button>
                                    </CopyToClipboard>
                                </OverlayTrigger>
                            </div>
                        )}
                        {!projectInfo.IsOwner && (
                            <div className=" mt-auto mx-auto col-8">
                                <Button
                                    variant='danger'
                                    className='btn-lg my-4 w-100'
                                    onClick={handleShow}

                                >
                                    <div className='mt-1'>
                                        <DoorOpenFill className='me-1 m-0 p-0 pb-1' size={38}></DoorOpenFill>
                                        <span>Leave the Project</span>
                                    </div>
                                </Button>
                                <Modal show={show} onHide={handleClose} animation={false} aria-labelledby="contained-modal-title-vcenter" centered>
                                    <Modal.Body className='text-center'>
                                        <XCircle className='text-danger my-4' size={100}></XCircle>
                                        <h2>Are You Sure?</h2>
                                        <p>This action will delete all your data from the project, and the project will no longer be available to you.</p>
                                        <Container className='mt-4 mb-2'>
                                            <Button variant="secondary" onClick={handleClose} className='col-4 mx-3'>
                                                No
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={(e) => {
                                                    handleClose();
                                                    handleLeaveProject();
                                                }}
                                                className='col-4 mx-3'
                                            >
                                                Yes
                                            </Button>
                                        </Container>
                                    </Modal.Body>
                                </Modal>
                            </div>
                        )}
                    </div>
                </div>
            </Col>
            <Col xs={12} md={8} className="h-100">
                <div className="card p-4 rounded-4 border-0 shadow-lg h-100">
                    <Card className='border-4 rounded-3'>
                        <Container className="overflow-auto">
                            <Row className='fw-semibold d-flex flex-nowrap p-1'>
                                <Col xs={4} md={2} className='m-0 p-1'><p className='bg-dark text-light bg-opacity-75 rounded-2 d-flex align-items-center justify-content-center text-center w-100 h-100 m-0 p-0 py-2'>Member</p></Col>
                                <Col xs={4} md={2} className='m-0 p-1'><p className='bg-dark text-light bg-opacity-75 rounded-2 d-flex align-items-center justify-content-center text-center w-100 h-100 m-0 p-0 py-2'>Role</p></Col>
                                <Col xs={4} md={2} className='m-0 p-1'><p className='bg-dark text-light bg-opacity-75 rounded-2 d-flex align-items-center justify-content-center text-center w-100 h-100 m-0 p-0 py-2'>Base Salary</p></Col>
                                <Col xs={4} md={2} className='m-0 p-1'><p className='bg-dark text-light bg-opacity-75 rounded-2 d-flex align-items-center justify-content-center text-center w-100 h-100 m-0 p-0 py-2'>Role Ultrapoints</p></Col>
                                <Col xs={4} md={2} className='m-0 p-1'><p className='bg-dark text-light bg-opacity-75 rounded-2 d-flex align-items-center justify-content-center text-center w-100 h-100 m-0 p-0 py-2'>Personal Ultrapoints</p></Col>
                                <Col xs={4} md={2} className='m-0 p-1'><p className='bg-dark text-light bg-opacity-75 rounded-2 d-flex align-items-center justify-content-center text-center w-100 h-100 m-0 p-0 py-2'>Final Salary</p></Col>
                            </Row>
                            <Row className='d-flex flex-nowrap'>
                                <Col xs={12} md={6} className='border-bottom border-4'></Col>
                                <Col xs={12} md={6} className='border-bottom border-4'></Col>
                            </Row>
                            {projectInfo.Members.map((member, index) => (
                                <Row key={index} className={'d-flex flex-nowrap p-1'}>
                                    <Col xs={4} md={2} className='m-0 p-1'><p className={`${member.IsOwner === true ? 'bg-info bg-opacity-50' : 'border border-opacity-50 border-info'} rounded-2 d-flex align-items-center justify-content-center text-center w-100 h-100 m-0 p-0 py-1`}>{member.UserName}</p></Col>
                                    <Col xs={4} md={2} className='m-0 p-1'><p className={`${member.IsOwner === true ? 'bg-info bg-opacity-50' : 'border border-opacity-50 border-info'} rounded-2 d-flex align-items-center justify-content-center text-center w-100 h-100 m-0 p-0 py-1`}>{member.RoleName}</p></Col>
                                    <Col xs={4} md={2} className='m-0 p-1'><p className={`${member.IsOwner === true ? 'bg-info bg-opacity-50' : 'border border-opacity-50 border-info'} rounded-2 d-flex align-items-center justify-content-center text-center w-100 h-100 m-0 p-0 py-1`}>{projectInfo.BaseSalary} {projectInfo.Currency}</p></Col>
                                    <Col xs={4} md={2} className='m-0 p-1'><p className={`${member.IsOwner === true ? 'bg-info bg-opacity-50' : 'border border-opacity-50 border-info'} rounded-2 d-flex align-items-center justify-content-center text-center w-100 h-100 m-0 p-0 py-1`}>{member.RolePoints} UP ({member.RolePayment} {projectInfo.Currency})</p></Col>
                                    <Col xs={4} md={2} className='m-0 p-1'><p className={`${member.IsOwner === true ? 'bg-info bg-opacity-50' : 'border border-opacity-50 border-info'} rounded-2 d-flex align-items-center justify-content-center text-center w-100 h-100 m-0 p-0 py-1`}>{member.PersonalPoints} UP ({member.PersonelPayment} {projectInfo.Currency})</p></Col>
                                    <Col xs={4} md={2} className='m-0 p-1'><p className={`${member.IsOwner === true ? 'bg-info bg-opacity-50' : 'border border-opacity-50 border-info'} rounded-2 d-flex align-items-center justify-content-center text-center w-100 h-100 m-0 p-0 py-1`}>{member.UserPayment} {projectInfo.Currency}</p></Col>
                                </Row>
                            ))}
                        </Container>
                    </Card>
                    {projectInfo.IsOwner && (
                        <Container className='justify-content-center d-flex mt-auto mx-auto'>
                            <Col xs={7}>
                                <Card className={`border-4 rounded-3 align-items-center justify-content-center text-center p-3 ${totalSalaryData.IsEnough == true ? 'border-danger' : ''}`}>
                                    <h4 className={`fw-semibold d-inline ${totalSalaryData.IsEnough == true ? 'text-danger' : ''}`}>Required amount to be paid: {totalSalaryData.TotalPayment} {projectInfo.Currency}</h4>
                                    <h5 className={`fw-semibold d-inline ${totalSalaryData.IsEnough == true ? 'text-danger' : 'text-muted'}`}>Amount on the card: {totalSalaryData.BankCardMoney} {projectInfo.Currency}</h5>
                                    {totalSalaryData.IsEnough && (
                                        <h5 className='fw-semibold d-inline text-danger'>Not enough money: {((totalSalaryData.BankCardMoney) - (totalSalaryData.TotalPayment)) * (-1)} {projectInfo.Currency}</h5>
                                    )}
                                </Card>
                                <Modal show={showNotEnoughModal} onHide={() => setShowNotEnoughModal(false)} animation={true} aria-labelledby="contained-modal-title-vcenter" centered>
                                    <Modal.Body className='text-center'>
                                        <ExclamationTriangle className='text-warning my-4' size={100}></ExclamationTriangle>
                                        <h2>Not Enough Money!</h2>
                                        <p>In case of non-payment, your project will be deleted! Deposit enough money to your card account to avoid this.</p>
                                        <Container className='mt-4 mb-2'>
                                            <Button variant="warning" onClick={() => setShowNotEnoughModal(false)} className='col-4 mx-3'>
                                                Ok
                                            </Button>
                                        </Container>
                                    </Modal.Body>
                                </Modal>
                            </Col>
                        </Container>
                    )}
                </div>
            </Col>
        </Row>
    );
};

export default ProjectId;