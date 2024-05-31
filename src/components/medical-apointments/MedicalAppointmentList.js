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

const MedicalAppointmentList = () => {
    const [medicalAppointments, setMedicalAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMedicalAppointments = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3001/api/medical-appointments', {
                    headers: {Authorization: `Bearer ${token}`}
                });
                setMedicalAppointments(response.data);
            } catch (error) {
                console.error('Error fetching medical appointments:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMedicalAppointments();
    }, []);

    if (isLoading) {
        return <LoadingSpinner/>;
    }

    const handleDelete = (id, patient_id) => {
        Swal.fire({
            title: `¿Estás seguro de que deseas eliminar la cita de ${patient_id}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar cita',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:3001/api/medical-appointments/${id}`, {
                    headers: {Authorization: `Bearer ${token}`}
                });
                setMedicalAppointments(medicalAppointments.filter(medicalAppointment => medicalAppointment.id !== id));
                toast.success('Cita médica eliminada exitosamente');
            } catch (error) {
                console.error('Error deleting medical appointments:', error);
            }
        });
    };

    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <div className="d-sm-flex align-items-center justify-content-between mb-2">
                        <h1 className="h3 mb-0 text-gray-800">Citas Médicas</h1>
                        <a href="/add-medical-appointment" className="btn btn-primary btn-sm btn-icon-split">
                            <FontAwesomeIcon icon={solidIcons.faPlus} className="me-1"/>
                            Agendar Cita Médica
                        </a>
                    </div>
                </div>

                <div className="card-body">
                    {medicalAppointments.length === 0 ? (
                        <div className="text-center text-muted">
                            No hay citas médicas para mostrar
                        </div>
                    ) : (
                        <>

                            <div className="search-container">
                                <input type="text" className="search-input" placeholder="Buscar..."/>
                                <button className="search-button">Buscar</button>
                            </div>
                            <div className="table-responsive">
                                <table className="styled-table" id="medicalAppointmentsTable">
                                    <thead>
                                    <tr>
                                        <th>Fecha/hora</th>
                                        <th>Paciente</th>
                                        <th>Especialidad</th>
                                        <th>Doctor</th>
                                        <th>Estado</th>
                                        <th style={{width: "120px"}}>Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {medicalAppointments.map(medicalAppointment => (
                                        <tr key={medicalAppointment.id}>
                                            <td>{moment(medicalAppointment.date).format('MM-DD')} /  {moment(medicalAppointment.time, 'HH:mm').format('HH:mm')}</td>
                                            <td>{medicalAppointment.patient_id}</td>
                                            <td>{medicalAppointment.medical_speciality_id}</td>
                                            <td>{medicalAppointment.doctor_id}</td>
                                            <td>{medicalAppointment.state}</td>
                                            <td>
                                                <Link to={`/edit-medical-appointment/${medicalAppointment.id}`}
                                                      state={medicalAppointment} className="btn btn-warning btn-sm me-1"
                                                      title="Editar">
                                                    <FontAwesomeIcon icon={solidIcons.faEdit}/>
                                                </Link>
                                                <button className="btn btn-danger btn-sm" title="Eliminar"
                                                        onClick={() => handleDelete(medicalAppointment.id, medicalAppointment.patients_id)}>
                                                    <FontAwesomeIcon icon={solidIcons.faTrash}></FontAwesomeIcon>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MedicalAppointmentList;
