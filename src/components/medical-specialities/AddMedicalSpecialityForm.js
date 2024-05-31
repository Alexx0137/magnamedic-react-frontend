import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';

const AddMedicalSpecialityForm = () => {
    const [medicalSpeciality, setMedicalSpeciality] = useState({
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
        dateOfBirth: ''
    });

    const handleChange = e => {
        const {name, value} = e.target;
        setMedicalSpeciality(prevMedicalSpeciality => ({
            ...prevMedicalSpeciality,
            [name]: value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Aquí puedes enviar los datos del paciente al servidor
        console.log(medicalSpeciality);
        // Luego puedes redirigir al usuario o realizar otras acciones necesarias
    };

    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h1 className="h3 mb-0 text-gray-800">Crear Especialidad Médica</h1>
                </div>

                <div className="card-body">

                    <form className="form">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="firstName">Nombre de la especialidad:</label>
                                <input type="text" className="form-control" id="firstName" placeholder="" required/>
                            </div>

                        </div>

                        <div className="form-row">
                            <div className="col-md-6">
                                <a href="/medical-specialities" className="btn btn-secondary btn-sm mt-2 mx-1">
                                    <FontAwesomeIcon icon={solidIcons.faArrowLeft}></FontAwesomeIcon>
                                    Cancelar
                                </a>
                                <a onClick="" href="#"
                                   className="btn btn-primary btn-sm mt-2 mx-1">
                                    Guardar
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
        ;
};

export default AddMedicalSpecialityForm;
