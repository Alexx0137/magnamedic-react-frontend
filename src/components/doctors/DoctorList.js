import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import {Link} from "react-router-dom";

const DoctorList = () => {
    const [doctors, setDoctors] = useState([
        {
            id: 1,
            identification: "123456789",
            identification_type_id: 1,
            name: "Juan",
            last_name: "Pérez",
            gender_id: "Masculino",
            medical_speciality: "Medicina Géneral",
            date_of_birth: "1984-07-13",
            address: "Calle 30 sur #12-24",
            city: "Bogotá",
            telephone: "3013235689",
            email: "juanperez@mail.com",
            blood_type_id: 3,
            professional_card: 808080,
            created_at: "2015-07-10 09:45:15"
        },
        {
            id: 2,
            identification: "987654321",
            identification_type_id: 1,
            name: "María",
            last_name: "López",
            gender_id: "Femenino",
            medical_speciality: "odontología",
            date_of_birth: "1990-01-24",
            address: "Carrera 25 #15-10",
            city: "Medellin",
            telephone: "3104567890",
            email: "marialopez@mail.com",
            blood_type_id: 1,
            professional_card: 201050,
            created_at: "2016-03-20 11:30:45"
        },
    ]);

    const handleDelete = (id, name, last_name) => {
        Swal.fire({
            title: `¿Estás seguro de que deseas eliminar el doctor ${name} ${last_name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setDoctors(doctors.filter(doctor => doctor.id !== id));
            }
        });
    };

    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <div className="d-sm-flex align-items-center justify-content-between mb-2">
                        <h1 className="h3 mb-0 text-gray-800">Médicos</h1>
                        <a href="/add-doctor" className="btn btn-primary btn-sm btn-icon-split">
                            <FontAwesomeIcon icon={solidIcons.faPlus} className="me-1"/>
                            Crear médico
                        </a>
                    </div>
                </div>

                <div className="card-body">
                    <div className="search-container">
                        <input type="text" className="search-input" placeholder="Buscar..."/>
                        <button className="search-button">Buscar</button>
                    </div>
                    <div className="table-responsive">
                        <table className="styled-table" id="doctorsTable">
                            <thead>
                            <tr>
                                <th>Documento</th>
                                <th>Nombre</th>
                                <th>Sexo</th>
                                <th>Especialidad</th>
                                <th>Teléfono</th>
                                <th>Fecha nacimiento</th>
                                <th>correo</th>
                                <th>fecha registro</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {doctors.map(doctor => (
                                <tr key={doctor.id}>
                                    <td>{doctor.identification}</td>
                                    <td>{doctor.name} {doctor.last_name}</td>
                                    <td>{doctor.gender_id}</td>
                                    <td>{doctor.medical_speciality}</td>
                                    <td>{doctor.telephone}</td>
                                    <td>{doctor.date_of_birth}</td>
                                    <td>{doctor.email}</td>
                                    <td>{doctor.created_at}</td>
                                    <td>
                                        <Link to={`/edit-doctor/${doctor.id}`}
                                              state={doctor} className="btn btn-warning btn-sm me-1"
                                              title="Editar">
                                            <FontAwesomeIcon icon={solidIcons.faEdit}/>
                                        </Link>
                                        <button className="btn btn-danger btn-sm" title="Eliminar"
                                                onClick={() => handleDelete(doctor.id, doctor.name, doctor.last_name)}>
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

export default DoctorList;
