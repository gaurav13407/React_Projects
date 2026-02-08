import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AppointmentDetails from './components/AppointmentDetails';
import DoctorPatientDetails from './components/DoctorPatientDetails';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route 
          path="/patients/:patientId/appointments/:appointmentId" 
          element={<AppointmentDetails />} 
        />
        <Route 
          path="/doctors/:doctorId/patients/:patientId" 
          element={<DoctorPatientDetails />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
