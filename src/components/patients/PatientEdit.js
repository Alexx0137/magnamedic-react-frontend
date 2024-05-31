import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';
import moment from 'moment';

const PatientEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3001/api/patients/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                let formattedPatient = response.data;

                if (typeof response.data.birth_date === 'string') {
                    formattedPatient = {
                        ...response.data,
                        birth_date: response.data.birth_date.slice(0, 10) // Formatear la fecha
                    };
                }

                setPatient(formattedPatient);
            } catch (error) {
                console.error('Error fetching patient:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPatient();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient({
            ...patient,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const updatedPatient = {
                id: patient.id, // Include the patient ID
                identification_type_id: patient.identification_type_id,
                identification: patient.identification,
                name: patient.name,
                last_name: patient.last_name,
                medical_record: patient.medical_record,
                eps: patient.eps,
                blood_type_id: patient.blood_type_id,
                gender_id: patient.gender_id,
                birth_date: patient.birth_date ? patient.birth_date.slice(0, 10) : null,
                age: patient.age,
                address: patient.address,
                telephone: patient.telephone,
                email: patient.email
            };
            await axios.put(`http://localhost:3001/api/patients/${id}`, updatedPatient, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/patients');
        } catch (error) {
            console.error('Error updating patient:', error);
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!patient) {
        return <div>Paciente no encontrado</div>;
    }

    const onCancel = () => {
        navigate('/patients');
    };

    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h1 className="h3 mb-0 text-gray-800">Editar paciente</h1>
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
                                    value={patient.name}
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
                                    value={patient.last_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="identification_type_id">Tipo de documento:</label>
                                <select className="form-control" id="identification_type_id" name="identification_type_id"
                                        value={patient.identification_type_id} onChange={handleChange} required>
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
                                    value={patient.identification}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="gender_id">Género:</label>
                                <select className="form-control"
                                        id="gender_id"
                                        name="gender_id"
                                        value={patient.gender_id}
                                        onChange={handleChange} required>
                                    <option value="" disabled>Seleccione una opción</option>
                                    <option value="1">Femenino</option>
                                    <option value="2">Masculino</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="blood_type_id">Tipo de sangre:</label>
                                <select className="form-control"
                                        id="blood_type_id"
                                        name="blood_type_id"
                                        value={patient.blood_type_id}
                                        onChange={handleChange}
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
                                    value={patient.eps}
                                    onChange={handleChange}
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
                                    placeholder=""
                                    value={patient.address}
                                    onChange={handleChange}
                                    required
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
                                    placeholder=""
                                    value={patient.telephone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="email">Correo:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder=""
                                    value={patient.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="birth_date">Fecha de nacimiento:</label>
                                <input type="date"
                                       className="form-control"
                                       id="birth_date"
                                       name="birth_date"
                                       value={moment(patient.birth_date).format('YYYY-MM-DD')}
                                       onChange={handleChange}
                                       required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6">

                                <button type="button" onClick={onCancel} className="btn btn-secondary btn-sm mt-2 mx-1">
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
    );
};

export default PatientEdit;
