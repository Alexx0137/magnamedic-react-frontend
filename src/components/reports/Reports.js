import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';

const Reports = () => {
    const [timePeriod, setTimePeriod] = useState('monthly');

    const handleChange = (event) => {
        setTimePeriod(event.target.value);
    };

    const generateReport = () => {
        // Lógica para generar los reportes
    };

    const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
        datasets: [
            {
                label: 'Citas por Médico',
                data: [30, 50, 40, 70, 60, 80, 90],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const pieData = {
        labels: ['Pediatría', 'Dermatología', 'Ginecología', 'Oftalmología', 'Traumatología'],
        datasets: [
            {
                label: 'Especialidades más Solicitadas',
                data: [30, 20, 25, 15, 10],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ pb: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Reportes
                </Typography>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <FormControl fullWidth>
                            <InputLabel>Periodo de Tiempo</InputLabel>
                            <Select
                                value={timePeriod}
                                label="Periodo de Tiempo"
                                onChange={handleChange}
                            >
                                <MenuItem value={'daily'}>Diario</MenuItem>
                                <MenuItem value={'weekly'}>Semanal</MenuItem>
                                <MenuItem value={'monthly'}>Mensual</MenuItem>
                                <MenuItem value={'yearly'}>Anual</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={generateReport}>
                            Generar Reporte
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2, height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            Citas por Médico
                        </Typography>
                        <Box sx={{ height: '100%' }}>
                            <Bar data={data} options={options} />
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2, height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            Especialidades más Solicitadas
                        </Typography>
                        <Box sx={{ height: '100%' }}>
                            <Pie data={pieData} options={options} />
                        </Box>
                    </Paper>
                </Grid>

                {/* Otros gráficos e informes aquí */}

            </Grid>
        </Container>
    );
};

export default Reports;
