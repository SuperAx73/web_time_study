import React, { useState } from 'react';
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
    const data = measurements.map(m => ({
      'Fecha': format(new Date(m.timestamp), 'dd/MM/yyyy'),
      'Hora': format(new Date(m.timestamp), 'HH:mm:ss'),
      'Tiempo': m.time,
      'Descripción': m.description,
    }));

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
                <TableCell>Tiempo</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {measurements.map((measurement) => (
                <TableRow key={measurement.id}>
                  <TableCell>
                    {format(new Date(measurement.timestamp), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>
                    {format(new Date(measurement.timestamp), 'HH:mm:ss')}
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
              ))}
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