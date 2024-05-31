import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';

const UserEdit = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3001/api/users/${id}`, {
                    headers: {Authorization: `Bearer ${token}`}
                });

                let formattedUser = response.data;

                if (typeof response.data.birth_date === 'string') {
                    formattedUser = {
                        ...response.data,
                        birth_date: response.data.birth_date.slice(0, 10) // Formatear la fecha
                    };
                }

                setUser(formattedUser);
            } catch (error) {
                console.error('Error fetching user:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = e => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const updatedUser = {
                identification_type_id: user.identification_type_id,
                identification: user.identification,
                name: user.name,
                last_name: user.last_name,
                email: user.email,
                password: user.password,
                role_id: user.role_id
            };
            await axios.put(`http://localhost:3001/api/users/${id}`, updatedUser, {
                headers: {Authorization: `Bearer ${token}`}
            });
            navigate('/users');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    if (isLoading) {
        return <LoadingSpinner/>;
    }

    if (!user) {
        return <div>Usuario no encontrado</div>;
    }

    const onCancel = () => {
        navigate('/users');
    };

    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h1 className="h3 mb-0 text-gray-800">Editar usuario</h1>
                </div>
                <div className="card-body">
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="name">Nombres:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    placeholder=""
                                    value={user.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="last_name">Apellidos:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="last_name"
                                    name="last_name"
                                    placeholder=""
                                    value={user.last_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="identification_type_id">Tipo de documento:</label>
                                <select className="form-control"
                                        id="identification_type_id"
                                        name="identification_type_id"
                                        value={user.identification_type_id}
                                        onChange={handleChange}
                                        required
                                >
                                    <option value="">Seleccione una opción</option>
                                    <option value="1">Registro civil</option>
                                    <option value="2">Tarjeta de identidad</option>
                                    <option value="3">Cédula de ciudadanía</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="identification">Número de documento:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="identification"
                                    name="identification"
                                    placeholder=""
                                    value={user.identification}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="email">Correo:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder=""
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="password">Contraseña:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder=""
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="role_id">Rol del usuario:</label>
                                <select className="form-control"
                                        id="role_id"
                                        name="role_id"
                                        value={user.role_id}
                                        onChange={handleChange}
                                        required
                                >
                                    <option value="" disabled>Seleccione una opción</option>
                                    <option value="1">Administrador</option>
                                    <option value="2">Auxiliar</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6">

                                <button type="button" onClick={onCancel} className="btn btn-secondary btn-sm mt-2 mx-1">
                                    <FontAwesomeIcon icon={solidIcons.faArrowLeft}/> Cancelar
                                </button>

                                <button type="submit" onClick={handleSubmit}
                                        className="btn btn-primary btn-sm mt-2 mx-1">
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserEdit;
