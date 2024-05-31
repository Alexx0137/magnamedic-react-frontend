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


const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3001/api/patients', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Ordenar los pacientes por la fecha de registro en orden descendente
                const sortedPatients = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setPatients(sortedPatients);
            } catch (error) {
                console.error('Error fetching patients:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPatients();
    }, []);

    if (isLoading) {
        return <LoadingSpinner/>;
    }
    // Función para manejar la eliminación de pacientes
    const handleDelete = (id, name, last_name) => {
        Swal.fire({
            title: `¿Estás seguro de que deseas eliminar el paciente ${name} ${last_name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem('token');
                    await axios.delete(`http://localhost:3001/api/patients/${id}`, {
                        headers: {Authorization: `Bearer ${token}`}
                    });
                    setPatients(patients.filter(patient => patient.id !== id));
                    toast.success('Paciente eliminado exitosamente');
                } catch (error) {
                    console.error('Error deleting patient:', error);
                }
            }
        });
    };

    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <div className="d-sm-flex align-items-center justify-content-between mb-2">
                        <h1 className="h3 mb-0 text-gray-800">Pacientes</h1>
                        <Link to="/patients/create" className="btn btn-primary btn-sm btn-icon-split">
                            <FontAwesomeIcon icon={solidIcons.faPlus} className="me-1"/>
                            Crear paciente
                        </Link>
                    </div>
                </div>

                <div className="card-body">
                    {patients.length === 0 ? (
                        <div className="text-center text-muted">
                            No hay pacientes para mostrar
                        </div>
                    ) : (
                        < >
                            <div className="search-container">
                                <input type="text" className="search-input" placeholder="Buscar..."/>
                                <button className="search-button">Buscar</button>
                            </div>
                            <div className="table-responsive">
                                <table className="styled-table">
                                    <thead>
                                    <tr>
                                        <th style={{width: "100px"}}>Documento</th>
                                        <th style={{width: "200px"}}>Nombres</th>
                                        <th style={{width: "150px"}}>Correo</th>
                                        <th style={{width: "250px"}}>Dirección</th>
                                        <th style={{width: "150px"}}>Teléfono</th>
                                        <th style={{width: "150px"}}>Fecha Registro</th>
                                        <th style={{width: "120px"}}>Acciones</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {patients.map(patient => (
                                        <tr key={patient.id}>
                                            <td>{patient.identification}</td>
                                            <td>{patient.name} {patient.last_name}</td>
                                            <td>{patient.email}</td>
                                            <td>{patient.address}</td>
                                            <td>{patient.telephone}</td>
                                            <td>
                                                {moment(patient.created_at).format('YYYY-MM-DD')}
                                            </td>
                                            <td>
                                                <Link to={`/patients/edit/${patient.id}`}
                                                      className="btn btn-warning btn-sm me-1" title="Editar">
                                                    <FontAwesomeIcon icon={solidIcons.faEdit}/>
                                                </Link>
                                                <button className="btn btn-danger btn-sm" title="Eliminar"
                                                        onClick={() => handleDelete(patient.id, patient.name, patient.last_name)}>
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

export default PatientList;
