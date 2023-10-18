import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";

const Account = (props) => {
    const user = useSelector((state) => state.auth.user);
    const info = useSelector((state) => state.auth.info);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <div className='container col-sm-12 col-md-4 my-4'>
                <div className="card p-4 pb-1 my-5 rounded-4 border-0 shadow-lg">
                    <h2 className='text-center'>Your Account Info</h2>

                    <div className='row mt-3'>
                        <div className='col-4 text-end card p-2 border-0'>
                            <p className="m-0 fw-bold">Firstname:</p>
                        </div>
                        <div className='col-7 text-center card rounded-2 p-2 mx-2 border-info'>
                            <p className="m-0">{info.Firstname}</p>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-4 text-end card p-2 border-0'>
                            <p className="m-0 fw-bold">Lastname:</p>
                        </div>
                        <div className='col-7 text-center card rounded-2 p-2 mx-2 border-info'>
                            <p className="m-0">{info.Lastname}</p>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-4 text-end card p-2 border-0'>
                            <p className="m-0 fw-bold">Email:</p>
                        </div>
                        <div className='col-7 text-center card rounded-2 p-2 mx-2 border-info'>
                            <p className="m-0">{info.Email}</p>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-4 text-end card p-2 border-0'>
                            <p className="m-0 fw-bold">Card Number:</p>
                        </div>
                        <div className='col-7 text-center card rounded-2 p-2 mx-2 border-info'>
                            <p className="m-0 ">{info.CardNumber}</p>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-4 text-end card p-2 border-0'>
                            <p className="m-0 fw-bold">Birth Date:</p>
                        </div>
                        <div className='col-7 text-center card rounded-2 p-2 mx-2 border-info'>
                            <p className="m-0">{info.BirthDate}</p>
                        </div>
                    </div>

                    <div className='d-flex justify-content-center my-4'>
                        <Link to='/account/edit' className='btn btn-primary col-8'>
                            Change account info
                        </Link>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default Account;
