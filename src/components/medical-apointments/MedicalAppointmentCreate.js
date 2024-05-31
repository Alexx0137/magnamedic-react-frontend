import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MedicalAppointmentCreate = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [state] = useState('Pendiente');
    const [observations, setObservations] = useState('');
    const [patient, setPatient] = useState(null);
    const [doctorId, setDoctorId] = useState('');
    const [medicalSpecialityId, setMedicalSpecialityId] = useState('');
    const [identification, setIdentification] = useState('');

    const navigate = useNavigate();

    const searchPatient = async () => {
        if (!identification.trim()) {
            console.error('Por favor ingrese un número de identificación');
            return;
        }

        try {
            const response = await axios.get('http://localhost:3001/api/patients', {
                params: { identification }
            });

            if (response.data.length > 0) {
                setPatient(response.data[0]);
            } else {
                console.log('Paciente no encontrado');
                setPatient(null);
            }
        } catch (error) {
            console.error('Error searching patient:', error);
            setPatient(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!patient) {
            console.error('Debe seleccionar un paciente antes de guardar la cita médica.');
            return;
        }

        try {
            const newMedicalAppointment = {
                date,
                time,
                state,
                observations,
                patient_id: patient.id,
                doctor_id: doctorId,
                medical_speciality_id: medicalSpecialityId
            };
            await axios.post('http://localhost:3001/api/medical-appointments/', newMedicalAppointment);
            navigate('/medical-appointments');
        } catch (error) {
            console.error('Error adding medical appointment:', error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h1 className="h3 mb-0 text-gray-800">Crear Cita Médica</h1>
                </div>
                <div className="card-body">
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="identification">Número de documento:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="identification"
                                    value={identification}
                                    onChange={(e) => setIdentification(e.target.value)} // Actualiza el estado identification cuando cambia el valor del campo
                                    required
                                />
                                <button type="button" className="btn btn-primary mt-2" onClick={searchPatient}>Buscar
                                    Paciente
                                </button>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="name">Nombre del Paciente:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={patient ? `${patient.name} ${patient.last_name}` : ''}
                                    readOnly
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="speciality">Especialidad:</label>
                                <select
                                    className="form-control"
                                    id="medicalSpeciality"
                                    value={medicalSpecialityId}
                                    onChange={(e) => setMedicalSpecialityId(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Seleccione una opción</option>
                                    <option value="1">Medicina general</option>
                                    <option value="2">Odontología</option>
                                    <option value="3">Pediatría</option>
                                    <option value="4">Cardiología</option>
                                    <option value="5">Dermatología</option>
                                </select>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="doctor">Médico:</label>
                                <select
                                    className="form-control"
                                    id="doctor"
                                    value={doctorId}
                                    onChange={(e) => setDoctorId(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Seleccione una opción</option>
                                    <option value="1">María Rodríguez</option>
                                    <option value="3">Ana Gutiérrez</option>
                                    <option value="4">Pedro Sánchez</option>
                                    <option value="5">José García</option>
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
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="appointmentTime">Hora de la Cita:</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="appointmentTime"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
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
                                    value={observations}
                                    onChange={(e) => setObservations(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-6">
                                <a href="/medical-appointments" className="btn btn-secondary btn-sm mt-2 mx-1">
                                    <FontAwesomeIcon icon={solidIcons.faArrowLeft}></FontAwesomeIcon>
                                    Cancelar
                                </a>
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

export default MedicalAppointmentCreate;
