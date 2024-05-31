import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const NotFound = () => {
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="text-center">
                                <FontAwesomeIcon icon={faExclamationTriangle} size="5x" color="#e74a3b" />
                            </div>
                            <div className="mt-4">
                                <h1 className="h4 mb-3">404 - Página no encontrada</h1>
                                <p className="text-muted">La página que estás buscando no existe.</p>
                                <Link to="/" className="btn btn-primary">Volver al inicio</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
