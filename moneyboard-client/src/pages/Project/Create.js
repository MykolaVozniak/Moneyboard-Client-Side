import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import InputMask from 'react-input-mask';


const Create = (props) => {
    const user = useSelector((state) => state.auth.user);

    const [formData, setFormData] = useState({
        name: '',
        baseSalary: '',
        salaryDate: '',
        cardNumber: '',
        cardVerificationValue: '',
        expirationDate: '',
        money: '',
        currency: '',
        projectPoinPercent: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:44339/api/Project/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json-patch+json',
                    'Authorization': `Bearer ${user.Token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Hurray');
                const data = await response.json();
                console.log('Success:', data);
            } else {
                alert('Error');
                const errorData = await response.json();
                console.error('Error:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }


    };

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container col-4 my-4">
            <div className="card p-4 pb-1 my-5 rounded-4 border-0 shadow-lg">
                <h2 className="text-center">Create Project</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            className="form-control"
                            name="baseSalary"
                            value={formData.baseSalary}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="date"
                            className="form-control"
                            name="salaryDate"
                            value={formData.salaryDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="card p-4 pb-1 my-5 rounded-4 border-0 shadow-lg">
                        <div className="mb-3">
                            <input
                                type="number"
                                className="form-control"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                className="form-control"
                                name="cardVerificationValue"
                                value={formData.cardVerificationValue}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="date"
                                className="form-control"
                                id="expirationDate"
                                name="expirationDate"
                                value={formData.expirationDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                className="form-control"
                                name="money"
                                value={formData.money}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                className="form-control"
                                name="currency"
                                value={formData.currency}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            className="form-control"
                            name="projectPoinPercent"
                            value={formData.projectPoinPercent}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Create;
