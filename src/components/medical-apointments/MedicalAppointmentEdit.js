import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const MedicalAppointmentEdit = ({ medicalAppointments, updateMedicalAppointment }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const [medicalAppointment, setMedicalAppointment] = useState({
        name: '',
        identification: '',
        speciality: '',
        doctor: '',
        appointmentDate: '',
        appointmentTime: '',
        observations: ''
    });

    useEffect(() => {
        if (location.state) {
            const appointment = location.state;
            setMedicalAppointment({
                name: appointment.patients_id,
                identification: appointment.identification,
                speciality: appointment.medical_speciality,
                doctor: appointment.doctors_id,
                appointmentDate: appointment.date,
                appointmentTime: appointment.time,
                observations: appointment.observations || ''
            });
        } else {
            // Fetch the appointment from medicalAppointments array if not passed via state
            const appointmentId = parseInt(id);
            const foundAppointment = medicalAppointments.find(app => app.id === appointmentId);
            if (foundAppointment) {
                setMedicalAppointment({
                    name: foundAppointment.patients_id,
                    identification: foundAppointment.identification,
                    speciality: foundAppointment.medical_speciality,
                    doctor: foundAppointment.doctors_id,
                    appointmentDate: foundAppointment.date,
                    appointmentTime: foundAppointment.time,
                    observations: foundAppointment.observations || ''
                });
            }
        }
    }, [id, location.state, medicalAppointments]);

    const handleChange = e => {
        const { name, value } = e.target;
        setMedicalAppointment(prevMedicalAppointment => ({
            ...prevMedicalAppointment,
            [name]: value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        updateMedicalAppointment(medicalAppointment.id, medicalAppointment);
        navigate('/medical-appointments');
    };

    const handleCancel = () => {
        navigate('/medical-appointments');
    };

    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h1 className="h3 mb-0 text-gray-800">Editar Cita Médica</h1>
                </div>
                <div className="card-body">
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="name">Nombre del Paciente:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    placeholder=""
                                    value={medicalAppointment.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="identification">Número de documento:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="numberidentificationId"
                                    name="identification"
                                    placeholder=""
                                    value={medicalAppointment.identification}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="speciality">Especialidad:</label>
                                <select
                                    className="form-control"
                                    id="speciality"
                                    name="speciality"
                                    value={medicalAppointment.speciality}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Seleccione una opción</option>
                                    <option value="Medicina general">Medicina general</option>
                                    <option value="Odontología">Odontología</option>
                                    <option value="Pediatría">Pediatría</option>
                                    <option value="Cardiología">Cardiología</option>
                                    <option value="Dermatología">Dermatología</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="doctor">Médico:</label>
                                <select
                                    className="form-control"
                                    id="doctor"
                                    name="doctor"
                                    value={medicalAppointment.doctor}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Seleccione una opción</option>
                                    <option value="María Rodríguez">María Rodríguez</option>
                                    <option value="Ana Gutiérrez">Ana Gutiérrez</option>
                                    <option value="Pedro Sánchez">Pedro Sánchez</option>
                                    <option value="José García">José García</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="appointmentDate">Fecha de la Cita:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="appointmentDate"
                                    name="appointmentDate"
                                    value={medicalAppointment.appointmentDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="appointmentTime">Hora de la Cita:</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="appointmentTime"
                                    name="appointmentTime"
                                    value={medicalAppointment.appointmentTime}
                                    onChange={handleChange}
                                    required
                                    min="06:00"
                                    max="18:00"
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-12 mb-3">
                                <label htmlFor="observations">Observaciones:</label>
                                <textarea
                                    className="form-control"
                                    id="observations"
                                    name="observations"
                                    value={medicalAppointment.observations}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6">
                                <button type="button" onClick={handleCancel} className="btn btn-secondary btn-sm mt-2 mx-1">
                                    <FontAwesomeIcon icon={solidIcons.faArrowLeft}></FontAwesomeIcon>
                                    Cancelar
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

export default MedicalAppointmentEdit;
