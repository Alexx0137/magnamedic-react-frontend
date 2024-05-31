import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PatientCreate = () => {
    const [identificationTypeId, setIdentificationTypeId] = useState('');
    const [identification, setIdentification] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [eps, setEps] = useState('');
    const [bloodTypeId, setBloodTypeId] = useState('');
    const [genderId, setGenderId] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [address, setAddress] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPatient = {
                identification_type_id: identificationTypeId,
                identification,
                name,
                last_name: lastName,
                eps,
                blood_type_id: bloodTypeId,
                gender_id: genderId,
                birth_date: birthDate,
                // Calcula la edad basada en la fecha de nacimiento
                age: calculateAge(birthDate),
                address,
                telephone,
                email
            };
            await axios.post('http://localhost:3001/api/patients/', newPatient);
            // Opcional: Redirigir o actualizar la lista de pacientes
            navigate('/patients');
        } catch (error) {
            console.error('Error adding patient:', error);
        }
    };

    // Función para calcular la edad
    const calculateAge = (birthDate) => {
        const birth = new Date(birthDate);
        const now = new Date();
        let age = now.getFullYear() - birth.getFullYear();
        const monthDiff = now.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h1 className="h3 mb-0 text-gray-800">Crear paciente</h1>
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
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="lastName">Apellidos:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="identificationTypeId">Tipo de documento:</label>
                                <select
                                    className="form-control"
                                    id="identificationTypeId"
                                    name="identificationTypeId"
                                    value={identificationTypeId}
                                    onChange={(e) =>
                                        setIdentificationTypeId(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Seleccione una opción</option>
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
                                    value={identification}
                                    onChange={(e) =>
                                        setIdentification(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="genderId">Género:</label>
                                <select
                                    className="form-control"
                                    id="genderId"
                                    name="genderId"
                                    value={genderId}
                                    onChange={(e) =>
                                        setGenderId(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Seleccione una opción</option>
                                    <option value="1">Femenino</option>
                                    <option value="2">Masculino</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="bloodTypeId">Tipo de sangre:</label>
                                <select
                                    className="form-control"
                                    id="bloodTypeId"
                                    name="bloodTypeId"
                                    value={bloodTypeId}
                                    onChange={(e) =>
                                        setBloodTypeId(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Seleccione una opción</option>
                                    <option value="1">A+</option>
                                    <option value="2">A-</option>
                                    <option value="3">B+</option>
                                    <option value="4">B-</option>
                                    <option value="5">AB+</option>
                                    <option value="6">AB-</option>
                                    <option value="7">O+</option>
                                    <option value="8">O-</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="eps">EPS:</label>
                                <select
                                    className="form-control"
                                    id="eps"
                                    name="eps"
                                    value={eps}
                                    onChange={(e) =>
                                        setEps(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Seleccione una opción</option>
                                    <option value="1">Compensar</option>
                                    <option value="2">Salud Total</option>
                                    <option value="3">Sura</option>
                                    <option value="4">Coomeva</option>
                                    <option value="5">Sanitas</option>
                                    <option value="6">Nueva EPS</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="address">Dirección:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    value={address}
                                    onChange={(e) =>
                                        setAddress(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="telephone">Teléfono:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="telephone"
                                    name="telephone"
                                    value={telephone}
                                    onChange={(e) =>
                                        setTelephone(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="email">Correo:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-row">

                            <div className="form-group col-md-6">
                                <label htmlFor="birthDate">Fecha de nacimiento:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="birthDate"
                                    name="birthDate"
                                    value={birthDate}
                                    onChange={(e) =>
                                        setBirthDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6">
                                <button type="button" className="btn btn-secondary btn-sm mt-2 mx-1" onClick={() => navigate('/patients')}>
                                    <FontAwesomeIcon icon={solidIcons.faArrowLeft} /> Cancelar
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
    );
};

export default PatientCreate;
