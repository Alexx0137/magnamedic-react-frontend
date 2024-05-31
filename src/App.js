import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LoadingSpinner from "./components/LoadingSpinner";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PatientList from './components/patients/PatientList';
import PatientCreate from './components/patients/PatientCreate';
import PatientEdit from './components/patients/PatientEdit';
import DoctorList from './components/doctors/DoctorList';
import DoctorCreate from './components/doctors/DoctorCreate';
import DoctorEdit from './components/doctors/DoctorEdit';
import MedicalAppointmentList from './components/medical-apointments/MedicalAppointmentList';
import MedicalAppointmentCreate from './components/medical-apointments/MedicalAppointmentCreate';
import MedicalAppointmentEdit from './components/medical-apointments/MedicalAppointmentEdit';
import MedicalSpecialityList from "./components/medical-specialities/MedicalSpecialityList";
import AddMedicalSpecialityForm from "./components/medical-specialities/AddMedicalSpecialityForm";
import EditMedicalSpecialityForm from "./components/medical-specialities/EditMedicalSpecialityForm";
import Reports from "./components/reports/Reports";
import UserCreate from "./components/users/UserCreate";
import UserEdit from "./components/users/UserEdit";
import UserList from "./components/users/UserList";
import NotFound from './components/NotFound';
import Login from './components/auth/Login';

import Sidebar from "./components/layouts/Sidebar";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import MainCard from "./components/layouts/MainCard";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
        setIsLoading(false);
    }, []);

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };


    if (isLoading) {
        return <LoadingSpinner />;
    }

    const DashboardLayout = ({ children }) => (
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <Navbar handleLogout={handleLogout} />
                <ToastContainer />
                <div id="content">
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    );

    return (
        <Router>
            {isLoggedIn ? (
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<DashboardLayout><MainCard /></DashboardLayout>} />
                    <Route path="/patients" element={<DashboardLayout><PatientList /></DashboardLayout>} />
                    <Route path="/patients/create" element={<DashboardLayout><PatientCreate /></DashboardLayout>} />
                    <Route path="/patients/edit/:id" element={<DashboardLayout><PatientEdit /></DashboardLayout>} />
                    <Route path="/doctors" element={<DashboardLayout><DoctorList /></DashboardLayout>} />
                    <Route path="/doctors/create" element={<DashboardLayout><DoctorCreate /></DashboardLayout>} />
                    <Route path="/doctors/edit/:id" element={<DashboardLayout><DoctorEdit /></DashboardLayout>} />
                    <Route path="/medical-appointments" element={<DashboardLayout><MedicalAppointmentList /></DashboardLayout>} />
                    <Route path="/add-medical-appointment" element={<DashboardLayout><MedicalAppointmentCreate /></DashboardLayout>} />
                    <Route path="/edit-medical-appointment/:id" element={<DashboardLayout><MedicalAppointmentEdit /></DashboardLayout>} />
                    <Route path="/medical-specialities" element={<DashboardLayout><MedicalSpecialityList /></DashboardLayout>} />
                    <Route path="/add-medical-speciality" element={<DashboardLayout><AddMedicalSpecialityForm /></DashboardLayout>} />
                    <Route path="/edit-medical-speciality/:id" element={<DashboardLayout><EditMedicalSpecialityForm /></DashboardLayout>} />
                    <Route path="/users" element={<DashboardLayout><UserList /></DashboardLayout>} />
                    <Route path="/users/create" element={<DashboardLayout><UserCreate /></DashboardLayout>} />
                    <Route path="/users/edit/:id" element={<DashboardLayout><UserEdit /></DashboardLayout>} />
                    <Route path="/reports" element={<DashboardLayout><Reports /></DashboardLayout>} />
                    <Route path="*" element={<DashboardLayout><NotFound /></DashboardLayout>} />
                </Routes>
            ) : (
                <Login handleLogin={handleLogin} />
            )}
        </Router>
    );
}

export default App;