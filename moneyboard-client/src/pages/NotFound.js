import React from 'react';
import picture from '../resources/Fillers/frogCute.png';

const NotFound = () => {
    return (
        <div className='container my-5 d-flex align-items-center justify-content-center'>
            <div className='row'>
                <div className='col-md-6 d-flex justify-content-center mt-4'>
                    <img
                        src={picture}
                        alt='picture'
                        width='75%'
                        className='d-flex justify-content-center'
                    />
                </div>
                <div className='col-md-6 d-flex align-items-center'>
                    <div>
                        <h2 className='mb-4'>Oops! This Page Doesn't Exist</h2>
                        <p>It seems that the page you were trying to access doesn't exist. Please check the URL and try again.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;