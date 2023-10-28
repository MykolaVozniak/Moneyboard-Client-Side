import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import config from '../../config';
import { Button, Card, Col, Container, Form, FormControl, FormSelect, InputGroup, Row } from 'react-bootstrap';
import SpinnerPage from '../../components/SpinnerPage';

const ProjectNCard = () => {
    const [error, setError] = useState(null);

    const [projectInfo, setProjectInfo] = useState(null);
    const [triggerInfo, setTriggerInfo] = useState(false);
    const [cardInfo, setCardInfo] = useState(null);
    const [triggerCard, setTriggerCard] = useState(false);

    const user = useSelector((state) => state.auth.user);
    const { projectId } = useParams();

    const [formData, setFormData] = useState({
        name: '',
        baseSalary: '',
        salaryDay: '',
        currency: '',
    });

    const [cardData, setCardData] = useState({
        cardNumber: '',
        cardVerificationValue: '',
        expirationDate: '',
        money: '',
    });

    const handleProjectChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCardChange = (e) => {
        const { name, value } = e.target;
        setCardData({
            ...cardData,
            [name]: value,
        });
    };

    const handleSubmitProjectEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${config.API_PROJECT_EDIT_PROJECT}${projectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json-patch+json',
                    'Authorization': `Bearer ${user.Token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setError(null);
            } else {
                const dataError = await response.json();
                setError(dataError.errors);
                console.error(dataError.errors);
            }
        } catch (error) {
            console.error(error);
            setError((prevError) => ({
                ...prevError,
                NewErrorKey: ['Unknown error, check the correctness of the entered data.']
            }));
        }
    };

    const handleSubmitCardEdit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${config.API_PROJECT_EDIT_BANK_CARD}${projectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json-patch+json',
                    'Authorization': `Bearer ${user.Token}`,
                },
                body: JSON.stringify(cardData),
            });

            if (response.ok) {
                setError(null);
            } else {
                const dataError = await response.json();
                setError(dataError.errors);
            }
        } catch (error) {
            setError((prevError) => ({
                ...prevError,
                NewErrorKey: ['Unknown error, check the correctness of the entered data.']
            }));
        }
    };

    useEffect(() => {
        const fetchProjectInfo = async () => {
            try {
                const response = await fetch(`${config.API_PROJECT_INFO}${projectId}`, {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${user.Token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setError(null);
                    setProjectInfo(data);
                    setTriggerInfo(true);
                } else {
                    const dataError = await response.json();
                    setError(dataError.error);
                }
            } catch (error) {
                setError(error);
            }
        };
        fetchProjectInfo();
    }, [projectId, user]);

    useEffect(() => {
        const fetchCardInfo = async () => {
            try {
                const response = await fetch(`${config.API_PROJECT_INFO_BANK_CARD}${projectId}`, {
                    headers: {
                        'accept': '*/*',
                        'Authorization': `Bearer ${user.Token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setError(null);
                    setCardInfo(data);
                    setTriggerCard(true);
                } else {
                    const dataError = await response.json();
                    setError(dataError.error);
                }
            } catch (error) {
                setError(error);
            }
        };
        fetchCardInfo();
    }, [projectId, user]);

    if (!cardInfo || !projectInfo) {
        return <SpinnerPage />;
    }

    if (triggerInfo) {
        const initialFormData = {
            name: `${projectInfo.Name}`,
            baseSalary: `${projectInfo.BaseSalary}`,
            salaryDay: `${projectInfo.PayDay}`,
            currency: `${projectInfo.Currency}`,
        };

        setFormData(initialFormData);
        setTriggerInfo(false);
    }

    if (triggerCard) {
        const fullDate = new Date(cardInfo.ExpirationDate);
        const year = fullDate.getFullYear();
        const month = (fullDate.getMonth() + 1).toString().padStart(2, '0');
        const result = `${year}-${month}`;

        const initialCardData = {
            cardNumber: `${cardInfo.CardNumber}`,
            cardVerificationValue: `${cardInfo.CardVerificationValue}`,
            expirationDate: result,
            money: `${cardInfo.Money}`,
        };
        setCardData(initialCardData)
        setTriggerCard(false);
    }

    return (
        <>
            <h2 className='text-center'>Edit Project Details</h2>
            <Container className='col-sm-12 col-md-11'>
                {error && (
                    <div className='card rounded-2 p-2 mt-4 border-danger'>
                        {Object.keys(error).map((key) => (
                            <div key={key}>
                                <div style={{ whiteSpace: 'pre-line' }} className='text-danger'>
                                    {'! ' + error[key].join('\n! ')}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <Form onSubmit={(e) => { handleSubmitCardEdit(e); handleSubmitProjectEdit(e); }}>
                    <InputGroup className='mt-4'>
                        <FormControl
                            type='text'
                            name='name'
                            placeholder='Project Name'
                            value={formData.name}
                            onChange={handleProjectChange}
                            className='form-control text-center'
                            required
                            size='lg'
                        />
                    </InputGroup>
                    <InputGroup className='mt-3'>
                        <InputGroup.Text className='w-50'>Project Currency</InputGroup.Text>
                        <FormSelect
                            as='select'
                            name='currency'
                            value={formData.currency}
                            onChange={handleProjectChange}
                            className='form-control'
                            required
                        >
                            <option value=''>Select...</option>
                            <option value='USD'>USD</option>
                            <option value='EUR'>EUR</option>
                            <option value='UAH'>UAH</option>
                            <option value='PLN'>PLN</option>
                            <option value='GBP'>GBP</option>
                            <option value='JPY'>JPY</option>
                            <option value='CAD'>CAD</option>
                            <option value='AUD'>AUD</option>
                        </FormSelect>
                    </InputGroup>
                    <InputGroup className='mt-3'>
                        <InputGroup.Text className='w-50'>Base Salary</InputGroup.Text>
                        <FormControl
                            type='number'
                            name='baseSalary'
                            value={formData.baseSalary}
                            onChange={handleProjectChange}
                            className='form-control'
                            required
                        />
                    </InputGroup>
                    <InputGroup className='mt-3'>
                        <InputGroup.Text >Payday is the </InputGroup.Text>
                        <FormControl
                            type='number'
                            name='salaryDay'
                            value={formData.salaryDay}
                            onChange={handleProjectChange}
                            className='form-control text-center'
                            required
                        />
                        <InputGroup.Text>day of every month</InputGroup.Text>
                    </InputGroup>
                    <Card bg='success' className='rounded-3 border-0 text-light mt-4 px-4'>
                        <h5 className='text-light text-center mt-3 mb-0'>YOUR CARD DETAILS</h5>
                        <InputGroup className='mt-3'>
                            <FormControl
                                type='number'
                                name='cardNumber'
                                placeholder='Card Number'
                                value={cardData.cardNumber}
                                onChange={handleCardChange}
                                className='form-control bg-success-subtle'
                                required
                            />
                        </InputGroup>
                        <Row>
                            <Col xs={7}>
                                <InputGroup className='mt-3'>
                                    <FormControl
                                        type='month'
                                        name='expirationDate'
                                        value={cardData.expirationDate}
                                        onChange={handleCardChange}
                                        className='form-control bg-success-subtle'
                                        required
                                    />
                                </InputGroup>
                            </Col>
                            <Col xs={5}>
                                <InputGroup className='mt-3'>
                                    <FormControl
                                        type='number'
                                        name='cardVerificationValue'
                                        placeholder='CVV2'
                                        value={cardData.cardVerificationValue}
                                        onChange={handleCardChange}
                                        className='form-control bg-success-subtle'
                                        required
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        <InputGroup className='mt-3 mb-4'>
                            <InputGroup.Text className='bg-success-subtle'>Available money:</InputGroup.Text>
                            <FormControl
                                type='number'
                                name='money'
                                placeholder='Amount'
                                value={cardData.money}
                                onChange={handleCardChange}
                                className='form-control bg-success-subtle border-3 border-bottom-0 border-top-0 border-light'
                                required
                            />
                            <InputGroup.Text className='bg-success-subtle'>
                                {!formData.currency && (
                                    <span>???</span>
                                )}
                                <span>{formData.currency}</span>
                            </InputGroup.Text>
                        </InputGroup>
                    </Card>
                    <div className='d-flex justify-content-center mt-4'>
                        <Button type='submit' variant='primary' className='col-8'>Save Changes</Button>
                    </div>
                </Form>
            </Container>
        </>
    );
};

export default ProjectNCard;