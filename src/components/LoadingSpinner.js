import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="grow" role="status">
        </Spinner>
    </div>
);

export default LoadingSpinner;
