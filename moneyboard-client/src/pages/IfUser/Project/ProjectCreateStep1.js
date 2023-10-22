import { useState } from "react";
import { useSelector } from "react-redux";
import config from "../../../config"
import { Button, Card, Col, Container, Form, FormControl, FormSelect, InputGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';

const ProjectCreateStep1 = (props) => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        baseSalary: '',
        salaryDay: '',
        cardNumber: '',
        cardVerificationValue: '',
        expirationDate: '',
        money: '',
        currency: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(config.API_PROJECT_CREATE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json-patch+json',
                    'Authorization': `Bearer ${user.Token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const dataInfo = await response.json();
                console.log(dataInfo.ProjectId);
                setError(null);
                navigate(`/project/create/${dataInfo.ProjectId}`);
            } else {
                const dataError = await response.json();
                setError(dataError.errors);
                console.error(dataError.errors);
                console.log(formData);
            }
        } catch (error) {
            console.error(error);
            console.log(formData);
            setError((prevError) => ({
                ...prevError,
                NewErrorKey: ['Unknown error, check the correctness of the entered data.']
            }));
        }
    };

    return (
        <>
            <div className='h-100'>
                <Container className='h-100'>
                    <Row>
                        <Col xs={12} className='d-flex align-items-center justify-content-center'>
                            <Container className='bg-white border-0 rounded-4 shadow-lg px-5 py-4 mt-5 col-sm-12 col-md-5'>
                                <h2 className='text-center'>Create Project</h2>
                                <Container className="col-sm-12 col-md-11">
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
                                    <Form onSubmit={handleSubmit}>
                                        <InputGroup className="mt-4">
                                            <FormControl
                                                type="text"
                                                name="name"
                                                placeholder='Project Name'
                                                value={formData.name}
                                                onChange={handleChange}
                                                className='form-control text-center'
                                                required
                                                size="lg"
                                            />
                                        </InputGroup>
                                        <InputGroup className="mt-3">
                                            <InputGroup.Text className='w-50'>Project Currency</InputGroup.Text>
                                            <FormSelect
                                                as="select"
                                                name="currency"
                                                value={formData.currency}
                                                onChange={handleChange}
                                                className='form-control'
                                                required
                                            >
                                                <option value="">Select...</option>
                                                <option value="USD">USD</option>
                                                <option value="EUR">EUR</option>
                                                <option value="UAH">UAH</option>
                                                <option value="PLN">PLN</option>
                                                <option value="GBP">GBP</option>
                                                <option value="JPY">JPY</option>
                                                <option value="CAD">CAD</option>
                                                <option value="AUD">AUD</option>
                                            </FormSelect>
                                        </InputGroup>
                                        <InputGroup className="mt-3">
                                            <InputGroup.Text className='w-50'>Base Salary</InputGroup.Text>
                                            <FormControl
                                                type="number"
                                                name="baseSalary"
                                                value={formData.baseSalary}
                                                onChange={handleChange}
                                                className='form-control'
                                                required
                                            />
                                        </InputGroup>
                                        <InputGroup className="mt-3">
                                            <InputGroup.Text >Payday is the </InputGroup.Text>
                                            <FormControl
                                                type="number"
                                                name="salaryDay"
                                                value={formData.salaryDay}
                                                onChange={handleChange}
                                                className='form-control text-center'
                                                required
                                            />
                                            <InputGroup.Text>day of every month</InputGroup.Text>
                                        </InputGroup>
                                        <Card bg="success" className="rounded-3 border-0 text-light mt-4 px-4">
                                            <h5 className='text-light text-center mt-3 mb-0'>YOUR CARD DETAILS</h5>
                                            <InputGroup className="mt-3">
                                                <FormControl
                                                    type="number"
                                                    name="cardNumber"
                                                    placeholder="Card Number"
                                                    value={formData.cardNumber}
                                                    onChange={handleChange}
                                                    className='form-control bg-success-subtle'
                                                    required
                                                />
                                            </InputGroup>
                                            <Row>
                                                <Col xs={7}>
                                                    <InputGroup className="mt-3">
                                                        <FormControl
                                                            type="month"
                                                            name="expirationDate"
                                                            value={formData.expirationDate}
                                                            onChange={handleChange}
                                                            className='form-control bg-success-subtle'
                                                            required
                                                        />
                                                    </InputGroup>
                                                </Col>
                                                <Col xs={5}>
                                                    <InputGroup className="mt-3">
                                                        <FormControl
                                                            type="number"
                                                            name="cardVerificationValue"
                                                            placeholder="CVV2"
                                                            value={formData.cardVerificationValue}
                                                            onChange={handleChange}
                                                            className='form-control bg-success-subtle'
                                                            required
                                                        />
                                                    </InputGroup>
                                                </Col>
                                            </Row>
                                            <InputGroup className="mt-3 mb-4">
                                                <InputGroup.Text className='bg-success-subtle'>Available money:</InputGroup.Text>
                                                <FormControl
                                                    type="number"
                                                    name="money"
                                                    placeholder="Amount"
                                                    value={formData.money}
                                                    onChange={handleChange}
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
                                            <Button type='submit' variant="primary" className='col-8'>Next</Button>
                                        </div>
                                    </Form>
                                </Container>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div >
        </>
    );
};

export default ProjectCreateStep1;
