import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const DoctorEdit = ({ doctors, updateDoctor }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const [doctor, setDoctor] = useState({
        name: '',
        lastName: '',
        identificationTypeId: '',
        identification: '',
        genderId: '',
        bloodTypeId: '',
        city: '',
        address: '',
        telephone: '',
        email: '',
        dateOfBirth: '',
        professionalCard: '',
        medicalSpeciality: ''
    });

    useEffect(() => {
        if (location.state) {
            const doctor = location.state;
            setDoctor({
                name: doctor.name,
                lastName: doctor.last_name,
                identificationTypeId: doctor.identification_type_id,
                identification: doctor.identification,
                genderId: doctor.gender_id,
                bloodTypeId: doctor.blood_type_id,
                city: doctor.city,
                address: doctor.address,
                telephone: doctor.telephone,
                email: doctor.email,
                dateOfBirth: doctor.date_of_birth,
                professionalCard: doctor.professional_card,
                medicalSpeciality: doctor.medical_speciality
            });
        } else {
        const doctorId = parseInt(id);
        const foundDoctor = doctors.find(doctor => doctor.id === doctorId);
            if (foundDoctor) {
            setDoctor({
                name: foundDoctor.name,
                lastName: foundDoctor.last_name,
                identificationTypeId: foundDoctor.identification_type_id,
                identification: foundDoctor.identification,
                genderId: foundDoctor.gender_id,
                bloodTypeId: foundDoctor.blood_type_id,
                city: foundDoctor.city,
                address: foundDoctor.address,
                telephone: foundDoctor.telephone,
                email: foundDoctor.email,
                dateOfBirth: foundDoctor.date_of_birth,
                professionalCard: foundDoctor.professional_card,
                medicalSpeciality: foundDoctor.medical_speciality
            });
        }
        }
    }, [id, doctors]);

    const handleChange = e => {
        const { name, value } = e.target;
        setDoctor(prevDoctor => ({
            ...prevDoctor,
            [name]: value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        updateDoctor(doctor.id, doctor);
    };

    const onCancel = () => {
        navigate('/doctors');
    };


    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h1 className="h3 mb-0 text-gray-800">Editar doctor</h1>
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
                                    value={doctor.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="lastName">Apellidos:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    placeholder=""
                                    value={doctor.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="identificationTypeId">Tipo de documento:</label>
                                <select className="form-control" id="identificationTypeId" name="identificationTypeId"
                                        value={doctor.identificationTypeId} onChange={handleChange} required>
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
                                    value={doctor.identification}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="city">Ciudad:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    name="city"
                                    placeholder=""
                                    value={doctor.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="address">Dirección:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    placeholder=""
                                    value={doctor.address}
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
                                    value={doctor.telephone}
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
                                    value={doctor.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="dateOfBirth">Fecha de nacimiento:</label>
                                <input type="date"
                                       className="form-control"
                                       id="dateOfBirth"
                                       name="dateOfBirth"
                                       value={doctor.dateOfBirth}
                                       onChange={handleChange}
                                       required
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="bloodTypeId">Tipo de sangre:</label>
                                <select className="form-control"
                                        id="bloodTypeId"
                                        name="bloodTypeId"
                                        value={doctor.bloodTypeId}
                                        onChange={handleChange}
                                        required>
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
                                <label htmlFor="professionalCard">Tarjeta profesional:</label>
                                <input type="text"
                                       className="form-control"
                                       id="professionalCard"
                                       name="professionalCard"
                                       value={doctor.professionalCard}
                                       onChange={handleChange}
                                       required/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="medicalSpeciality">Especialidad:</label>
                                <select className="form-control"
                                        id="medicalSpeciality"
                                        name="medicalSpeciality"
                                        value={doctor.medicalSpeciality}
                                        onChange={handleChange}
                                        required>
                                    <option value="" disabled selected>Seleccione una opción</option>
                                    <option value="1">Medicina general</option>
                                    <option value="2">Odontología</option>
                                    <option value="3">Pediatría</option>
                                    <option value="4">Cardiología</option>
                                    <option value="5">Dermatología</option>
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

export default DoctorEdit;
