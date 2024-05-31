import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import {useParams, useNavigate, useLocation} from 'react-router-dom';

const EditMedicalSpecialityForm = ({medicalSpecialities, updateMedicalSpeciality}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {id} = useParams();
    const [medicalSpeciality, setMedicalSpeciality] = useState({
        name: ''
    });

    useEffect(() => {
        if (location.state) {
            const medicalSpeciality = location.state;
            setMedicalSpeciality({
                name: medicalSpeciality.name,
            });
        } else {
            const medicalSpecialityId = parseInt(id);
            const foundMedicalSpeciality = medicalSpecialities.find(medicalSpeciality => medicalSpeciality.id === medicalSpecialityId);
            if (foundMedicalSpeciality) {
                setMedicalSpeciality({
                    name: foundMedicalSpeciality.name,
                });
            }
        }
    }, [id, location.state, medicalSpecialities]);

    const handleChange = e => {
        const {name, value} = e.target;
        setMedicalSpeciality(prevMedicalSpeciality => ({
            ...prevMedicalSpeciality,
            [name]: value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        updateMedicalSpeciality(medicalSpeciality.id, medicalSpeciality);
    };

    const onCancel = () => {
        navigate('/medical-specialities');
    };


    return (
        <div className="container-fluid">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h1 className="h3 mb-0 text-gray-800">Editar especialidad médica</h1>
                </div>
                <div className="card-body">
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="name">Nombre:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    placeholder=""
                                    value={medicalSpeciality.name}
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

export default EditMedicalSpecialityForm;
