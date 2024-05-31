import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

const MedicalSpecialityList = () => {
    const [medicalSpecialities, setMedicalSpecialities] = useState([
        {
            id: 1,
            name: "Medicina Géneral",
            created_at: "2015-07-10 09:45:15"
        },
        {
            id: 2,
            name: "Odontología",
            created_at: "2015-07-10 09:45:15"
        },
        {
            id: 3,
            name: "Pediatría",
            created_at: "2015-07-10 09:45:15"
        },
        {
            id: 4,
            name: "Oftalmología",
            created_at: "2015-07-10 09:45:15"
        },
        {
            id: 5,
            name: "Fisioterápia",
            created_at: "2015-07-10 09:45:15"
        },
        {
            id: 6,
            name: "Dermatología",
            created_at: "2015-07-10 09:45:15"
        },
    ]);

    const handleDelete = ( id, name ) => {
        Swal.fire({
            title: `¿Estás seguro de que deseas eliminar la especialidad de ${name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setMedicalSpecialities(medicalSpecialities.filter(medicalSpeciality => medicalSpeciality.id !== id));
            }
        });
    };

    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <div className="d-sm-flex align-items-center justify-content-between mb-2">
                        <h1 className="h3 mb-0 text-gray-800"> Especialidades Médicas</h1>
                        <a href="/add-medical-speciality" className="btn btn-primary btn-sm btn-icon-split">
                            <FontAwesomeIcon icon={solidIcons.faPlus} className="me-1" />
                            Crear Especialidad
                        </a>
                    </div>
                </div>

                <div className="card-body">
                    <div className="search-container">
                        <input type="text" className="search-input" placeholder="Buscar..." />
                        <button className="search-button">Buscar</button>
                    </div>
                    <div className="table-responsive">
                        <table className="styled-table" id="medicalSpecialitiesTable">
                            <thead>
                            <tr>
                                <th>Especialidad médica</th>
                                <th>Fecha registro</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {medicalSpecialities.map(medicalSpeciality => (
                                <tr key={medicalSpeciality.id}>
                                    <td>{medicalSpeciality.name}</td>
                                    <td>{medicalSpeciality.created_at}</td>
                                    <td>
                                        <Link to={`/edit-medical-speciality/${medicalSpeciality.id}`}
                                              state={medicalSpeciality} className="btn btn-warning btn-sm me-1"
                                              title="Editar">
                                            <FontAwesomeIcon icon={solidIcons.faEdit}/>
                                        </Link>
                                        <button className="btn btn-danger btn-sm" title="Eliminar"
                                                onClick={() => handleDelete( medicalSpeciality.id, medicalSpeciality.name )}>
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

export default MedicalSpecialityList;
