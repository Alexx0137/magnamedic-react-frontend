import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const UserCreate = () => {
    const [identificationTypeId, setIdentificationTypeId] = useState('');
    const [identification, setIdentification] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [roleId, setRoleId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newUser = {
                identification_type_id: identificationTypeId,
                identification,
                name,
                last_name: lastName,
                role_id: roleId,
                email,
                password
            };
            await axios.post('http://localhost:3001/api/users/', newUser);
            // Opcional: Redirigir o actualizar la lista de pacientes
            navigate('/users');
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h1 className="h3 mb-0 text-gray-800">Crear usuario</h1>
                </div>

                <div className="card-body">
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="firstName">Nombres:</label>
                                <input type="text"
                                       className="form-control"
                                       id="firstName"
                                       placeholder=""
                                       onChange={(e) =>
                                           setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="lastName">Apellidos:</label>
                                <input type="text"
                                       className="form-control"
                                       id="lastName"
                                       placeholder=""
                                       onChange={(e) =>
                                           setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="identificationTypeId">Tipo de documento:</label>
                                <select className="form-control"
                                        id="identificationTypeId"
                                        onChange={(e) =>
                                            setIdentificationTypeId(e.target.value)}
                                >
                                    <option value="" disabled>Seleccione una opción</option>
                                    <option value="1">Registro civil</option>
                                    <option value="2">Tarjeta de identidad</option>
                                    <option value="3">Cédula de ciudadanía</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="identification">Número de documento:</label>
                                <input type="text"
                                       className="form-control"
                                       id="identification"
                                       placeholder=""
                                       onChange={(e) =>
                                           setIdentification(e.target.value)}
                                />
                            </div>

                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="email">Correo:</label>
                                <input type="text"
                                       className="form-control"
                                       id="email"
                                       placeholder=""
                                       onChange={(e) =>
                                           setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="password">Contraseña:</label>
                                <input type="text"
                                       className="form-control"
                                       id="password"
                                       placeholder=""
                                       onChange={(e) =>
                                           setPassword(e.target.value)}                                />
                            </div>
                        </div>
                        <div className="form-row mt-2">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="roleId">Rol del usuario:</label>
                                <select className="form-control"
                                        id="roleId"
                                        name="roleId"
                                        value={roleId}
                                        onChange={(e) =>
                                            setRoleId(e.target.value)}
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
                                <button type="button" className="btn btn-secondary btn-sm mt-2 mx-1"
                                        onClick={() => navigate('/users')}>
                                    <FontAwesomeIcon icon={solidIcons.faArrowLeft}/> Cancelar
                                </button>
                                <button type="submit" className="btn btn-primary btn-sm mt-2 mx-1">
                                    Guardar
                                </button>
                            </div>
                        </div>
            </form>
        </div>
</div>
</div>
)
    ;
};

export default UserCreate;
