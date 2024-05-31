import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';

const DoctorCreate = () => {
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
        dateOfBirth: ''
    });

    const handleChange = e => {
        const {name, value} = e.target;
        setDoctor(prevDoctor => ({
            ...prevDoctor,
            [name]: value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Aquí puedes enviar los datos del paciente al servidor
        console.log(doctor);
        // Luego puedes redirigir al usuario o realizar otras acciones necesarias
    };

    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h1 className="h3 mb-0 text-gray-800">Crear médico</h1>
                </div>

                <div className="card-body">
                    <form className="form">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="firstName">Nombres:</label>
                                <input type="text" className="form-control" id="firstName" placeholder="" required/>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="lastName">Apellidos:</label>
                                <input type="text" className="form-control" id="lastName" placeholder="" required/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="identification">Tipo de documento:</label>
                                <select className="form-control" id="identification" required>
                                    <option value="" disabled selected>Seleccione una opción</option>
                                    <option value="1">Registro civil</option>
                                    <option value="2">Tarjeta de identidad</option>
                                    <option value="3">Cédula de ciudadanía</option>
                                </select>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="numberId">Número de documento:</label>
                                <input type="text" className="form-control" id="numberId" placeholder="" required/>
                            </div>

                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="city">Ciudad:</label>
                                <input type="text" className="form-control" id="city" placeholder="" required/>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="address">Dirección:</label>
                                <input type="text" className="form-control" id="address" placeholder="" required/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="phone">Teléfono:</label>
                                <input type="email" className="form-control" id="phone" placeholder="" required/>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="email">Correo:</label>
                                <input type="text" className="form-control" id="email" placeholder="" required/>
                            </div>
                        </div>
                        <div className="form-row mt-2">
                            <div className="form-group col-md-6">
                                <label htmlFor="birthDate">Fecha de nacimiento:</label>
                                <input type="date" className="form-control" id="birthDate" required/>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="bloodType">Tipo de sangre:</label>
                                <input type="text" className="form-control" id="bloodType" required/>
                            </div>
                        </div>
                        <div className="form-row mt-2">
                            <div className="form-group col-md-6">
                                <label htmlFor="professionalCard">Tarjeta profesional:</label>
                                <input type="text" className="form-control" id="professionalCard" required/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="speciality">Especialidad:</label>
                                <select className="form-control" id="speciality" required>
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
                                <a href="/doctors" className="btn btn-secondary btn-sm mt-2 mx-1">
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

export default DoctorCreate;
