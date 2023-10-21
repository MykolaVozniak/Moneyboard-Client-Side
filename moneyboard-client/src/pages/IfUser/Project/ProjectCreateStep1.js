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
        setFormData({ ...formData, 
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
        <div className='container col-sm-12 col-md-4 my-4'>
            <div className="card p-4 pb-1 my-5 rounded-4 border-0 shadow-lg">
                <h2 className='text-center'>Create Project</h2>
                {error && (
                    <Container className="sm-col-12 md-col-11 px-sm-0 px-md-4">
                    <div className='card rounded-2 p-2 mt-2 border-danger'>
                        {Object.keys(error).map((key) => (
                            <div key={key}>
                                <div style={{ whiteSpace: 'pre-line' }} className='text-danger'>
                                    {'! ' + error[key].join('\n! ')}
                                </div>
                            </div>
                        ))}
                    </div>
                    </Container>
                )}

                <form onSubmit={handleSubmit} >
                    <Container className="sm-col-12 md-col-11 px-sm-0 px-md-4">
                        <div className='d-flex justify-content-center my-3'>
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    name="name"
                                    className="form-control text-center"
                                    placeholder='Project Name'
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    size="lg"
                                />
                            </InputGroup>
                        </div>

                        <div className='d-flex justify-content-center my-3'>
                            <InputGroup>
                                <InputGroup.Text className='w-50'>Project Currency</InputGroup.Text>
                                <FormSelect
                                    as="select"
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                    size="3" aria-label="size 3 select example"
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
                        </div>

                        <div className='d-flex justify-content-center my-3'>
                            <InputGroup>
                                <InputGroup.Text className='w-50'>Base Salary</InputGroup.Text>
                                <FormControl
                                    type="number"
                                    name="baseSalary"
                                    className="form-control"
                                    value={formData.baseSalary}
                                    onChange={handleChange}
                                    required
                                />
                            </InputGroup>
                        </div>

                        <div className='d-flex justify-content-center my-3'>
                            <InputGroup>
                                <InputGroup.Text >Payday is the </InputGroup.Text>
                                <FormControl

                                    type="number"
                                    className="form-control"
                                    name="salaryDay"
                                    value={formData.salaryDay}
                                    onChange={handleChange}
                                    required
                                />

                                <InputGroup.Text>day of every month</InputGroup.Text>
                            </InputGroup>
                        </div>
                    </Container>

                    <Container className="d-flex justify-content-center my-4">
                        <Card className='bg-success rounded-3 border-0 text-light col-11'>
                            <h5 className='text-light text-center mt-3 mb-0'>YOUR CARD DETAILS</h5>
                            <div className='d-flex justify-content-center mt-3 px-4'>
                                <InputGroup>
                                    <FormControl
                                        type="number"
                                        className="form-control bg-success-subtle"
                                        placeholder="Card Number"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </InputGroup>
                            </div>
                            <div className='d-flex mt-3 px-4'>
                                <Row>
                                    <Col xs={7}>
                                        <InputGroup>
                                            <FormControl
                                                type="month"
                                                className="form-control bg-success-subtle"
                                                placeholder="MM/YY"
                                                name="expirationDate"
                                                value={formData.expirationDate}
                                                onChange={handleChange}
                                                required
                                            />
                                        </InputGroup>
                                    </Col>
                                    <Col xs={5} className='d-flex justify-content-end'>
                                        <InputGroup className=" w-75">
                                            <FormControl
                                                type="number"
                                                className="form-control bg-success-subtle"
                                                placeholder="CVV2"
                                                name="cardVerificationValue"
                                                value={formData.cardVerificationValue}
                                                onChange={handleChange}
                                                required
                                            />
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </div>
                            <div className='d-flex justify-content-center mt-3 mb-4 px-4'>
                                <InputGroup>
                                    <InputGroup.Text className='bg-success-subtle'>Available money:</InputGroup.Text>
                                    <FormControl
                                        type="number"
                                        className="form-control bg-success-subtle border-3 border-bottom-0 border-top-0 border-light"
                                        name="money"
                                        value={formData.money}
                                        onChange={handleChange}
                                        required
                                        placeholder="Amount"
                                    />
                                    <InputGroup.Text className='bg-success-subtle'>
                                        {!formData.currency && (
                                            <span>???</span>
                                        )}
                                         <span>{formData.currency}</span>
                                    </InputGroup.Text>
                                </InputGroup>
                            </div>
                        </Card>
                    </Container>
                    <div className='d-flex justify-content-center my-3'>
                        <Button type='submit' className='btn btn-primary col-8'>Next</Button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default ProjectCreateStep1;
