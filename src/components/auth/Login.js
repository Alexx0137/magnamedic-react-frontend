import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/login.css';
import logo from '../../assets/img/magnamedic(5).png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token); // Guardar el token
                handleLogin(data.token);
                toast.success('¡Bienvenido/a!'); // Display toast on successful login
                navigate('/');
            } else {
                setError(data.message || 'Error de inicio de sesión');
                toast.error(data.message || 'Credenciales incorrectas'); // Display error toast
            }
        } catch (error) {
            console.error('Error de inicio de sesión:', error);
            setError('Error de inicio de sesión');
        }
    };


        return (
            <div className="background-container d-flex align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9 col-md-9">
                            <div className="card o-hidden border-0 shadow-lg my-5 mx-auto">
                                <div className="card-body p-0">
                                    <div className="row">
                                        <div className="col-lg-6 d-none d-lg-block">
                                            <div
                                                className="card-logo-container d-flex align-items-center justify-content-center">
                                                <div className="image-container">
                                                    <img src={logo} alt="Logo de Magnamedic"
                                                         className="img-fluid centered-and-resized smaller-logo"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-login">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900"><strong>Iniciar sesión</strong></h1>
                                                </div>
                                                <form className="user" onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                        <label htmlFor="inputEmail"></label>
                                                        <input
                                                            type="email"
                                                            className="form-control form-control-user"
                                                            id="inputEmail"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="inputPassword"></label>
                                                        <input
                                                            type="password"
                                                            className="form-control form-control-user"
                                                            id="inputPassword"
                                                            placeholder="Contraseña"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                    </div>
                                                    <button type="submit"
                                                            className="btn btn-primary btn-user btn-block mt-3">
                                                        Login
                                                    </button>
                                                </form>
                                                <hr/>
                                                {error && <p className="text-danger">{error}</p>}
                                                <div className="text-center">
                                                    <a className="small" href="#">¿Olvidaste la contraseña?</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
;

export default Login;
