import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon, Timer as TimerIcon } from '@mui/icons-material';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';

function App() {
  const [measurements, setMeasurements] = useState([]);
  const [currentTime, setCurrentTime] = useState('');
  const [description, setDescription] = useState('');

  // Cargar registros guardados al iniciar
  useEffect(() => {
    const saved = localStorage.getItem('measurements');
    if (saved) {
      setMeasurements(JSON.parse(saved));
    }
  }, []);
  // Guardar registros cada vez que cambian
  useEffect(() => {
    localStorage.setItem('measurements', JSON.stringify(measurements));
  }, [measurements]);

  const handleAddMeasurement = () => {
    if (!currentTime || !description) return;

    const newMeasurement = {
      id: Date.now(),
      time: currentTime,
      description,
      timestamp: new Date().toISOString(),
    };

    setMeasurements([...measurements, newMeasurement]);
    setCurrentTime('');
    setDescription('');
  };

  const handleDeleteMeasurement = (id) => {
    setMeasurements(measurements.filter(m => m.id !== id));
  };

  const exportToExcel = () => {
    const data = measurements.map(m => {
      const endDate = new Date(m.timestamp);
      const minutes = parseFloat(m.time) || 0;
      const startDate = new Date(endDate.getTime() - minutes * 60000);
      return {
        'Fecha': format(endDate, 'dd/MM/yyyy'),
        'Hora': format(endDate, 'HH:mm:ss'),
        'Hora de Inicio': format(startDate, 'HH:mm:ss'),
        'Tiempo': m.time,
        'Descripción': m.description,
      };
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Estudio de Tiempos');
    XLSX.writeFile(wb, `estudio_tiempos_${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Estudio de Tiempos
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Tiempo"
            value={currentTime}
            onChange={(e) => setCurrentTime(e.target.value)}
            placeholder="Ej: 1.5"
            type="number"
            fullWidth
          />
          <TextField
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción de la actividad"
            fullWidth
          />
          <Button
            variant="contained"
            onClick={handleAddMeasurement}
            startIcon={<TimerIcon />}
            sx={{ minWidth: 120 }}
          >
            Agregar
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Hora de Inicio</TableCell>
                <TableCell>Tiempo</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {measurements.map((measurement) => {
                const endDate = new Date(measurement.timestamp);
                const minutes = parseFloat(measurement.time) || 0;
                const startDate = new Date(endDate.getTime() - minutes * 60000);
                return (
                  <TableRow key={measurement.id}>
                    <TableCell>
                      {format(endDate, 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      {format(endDate, 'HH:mm:ss')}
                    </TableCell>
                    <TableCell>
                      {format(startDate, 'HH:mm:ss')}
                    </TableCell>
                    <TableCell>{measurement.time}</TableCell>
                    <TableCell>{measurement.description}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleDeleteMeasurement(measurement.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {measurements.length > 0 && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={exportToExcel}
            >
              Exportar a Excel
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default App; 