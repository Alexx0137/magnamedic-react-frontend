import React from 'react';
import Swal from 'sweetalert2';
import userAvatar from '../../assets/img/undraw_profile.svg';

const Navbar = ({ handleLogout }) => {
    const confirmLogout = (e) => {
        e.preventDefault();
        Swal.fire({
            title: '¿Desea cerrar la sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                handleLogout();
            }
        });
    };

    return (
        <header>
            <nav className="dashboard-navbar navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="d-flex justify-content-end w-100">
                        <div className="user-profile dropdown">
                            <a className="dropdown-toggle-no-arrow" href="#" role="button" id="userDropdown"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="text-gray-600 mr-2">Nelson García</span>
                                <img src={userAvatar} alt="User Avatar" className="img-profile rounded-circle"
                                     style={{width: '30px', height: '30px'}}/>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Perfil
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Configuraciones
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#" onClick={confirmLogout}>
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Cerrar sesión
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
