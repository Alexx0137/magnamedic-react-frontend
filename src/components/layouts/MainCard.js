import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { CalendarToday, People, LocalHospital, Group } from '@mui/icons-material';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const MainCard = () => {
    const appointmentsData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Citas',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const patientsData = {
        labels: ['Active', 'Inactive'],
        datasets: [
            {
                data: [300, 50],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    const barOptions = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const doughnutOptions = {
        maintainAspectRatio: false,
        aspectRatio: 1,
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ pb: 5 }}>
                <h1 className="h3 mb-0 text-gray-800">
                    Resumen del día
                </h1>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="subtitle1" color="primary">
                                Citas del día
                            </Typography>
                            <Typography variant="h5" component="div">
                                45
                            </Typography>
                        </Box>
                        <CalendarToday fontSize="large" color="action" />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="subtitle1" color="primary">
                                Número de pacientes
                            </Typography>
                            <Typography variant="h5" component="div">
                                620
                            </Typography>
                        </Box>
                        <People fontSize="large" color="action" />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="subtitle1" color="primary">
                                Número de médicos
                            </Typography>
                            <Typography variant="h5" component="div">
                                10
                            </Typography>
                        </Box>
                        <LocalHospital fontSize="large" color="action" />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="subtitle1" color="primary">
                                Número de usuarios
                            </Typography>
                            <Typography variant="h5" component="div">
                                4
                            </Typography>
                        </Box>
                        <Group fontSize="large" color="action" />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2, height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            Estadísticas de Citas
                        </Typography>
                        <Box sx={{ height: '100%' }}>
                            <Bar data={appointmentsData} options={barOptions} />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2, height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            Estado de los Pacientes
                        </Typography>
                        <Box sx={{ width: '100%', maxWidth: '500px', height: '400px' }}>
                            <Doughnut data={patientsData} options={doughnutOptions} />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MainCard;
