import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import axios from '../../axios';
import LoadingSpinner from "../LoadingSpinner";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3001/api/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Ordenar los usuarios por la fecha de registro en orden descendente
                const sortedUsers = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setUsers(sortedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (isLoading) {
        return <LoadingSpinner/>;
    }

    // Función para manejar la eliminación de usuarios
    const handleDelete = (id, name, last_name) => {
        Swal.fire({
            title: `¿Estás seguro de que deseas eliminar el usuario ${name} ${last_name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token');
                    await axios.delete(`http://localhost:3001/api/users/${id}`, {
                        headers: {Authorization: `Bearer ${token}`}
                    });
                    setUsers(users.filter(user => user.id !== id));
                    toast.success('Usuario eliminado exitosamente');
                } catch (error) {
                    console.error('Error deleting user:', error);
                }
            }
        });
    };
    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <div className="d-sm-flex align-items-center justify-content-between mb-2">
                        <h1 className="h3 mb-0 text-gray-800">Usuarios</h1>
                        <a href="/users/create" className="btn btn-primary btn-sm btn-icon-split">
                            <FontAwesomeIcon icon={solidIcons.faPlus} className="me-1"/>
                            Crear usuario
                        </a>
                    </div>
                </div>

                <div className="card-body">
                    <div className="search-container">
                        <input type="text" className="search-input" placeholder="Buscar..."/>
                        <button className="search-button">Buscar</button>
                    </div>
                    <div className="table-responsive">
                        <table className="styled-table" id="usersTable">
                            <thead>
                            <tr>
                                <th>Identificación</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Fecha</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.identification}</td>
                                    <td>{user.name} {user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role_id}</td>
                                    <td>
                                        {moment(user.created_at).format('YYYY-MM-DD')}

                                    </td>
                                    <td>
                                        <Link to={`/users/edit/${user.id}`}
                                              state={user} className="btn btn-warning btn-sm me-1" title="Editar">
                                            <FontAwesomeIcon icon={solidIcons.faEdit}/>
                                        </Link>
                                        <button className="btn btn-danger btn-sm" title="Eliminar"
                                                onClick={() => handleDelete(user.id, user.name, user.last_name)}>
                                            <FontAwesomeIcon icon={solidIcons.faTrash}></FontAwesomeIcon>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserList;
