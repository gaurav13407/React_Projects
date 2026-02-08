import { useParams, Link } from 'react-router-dom';
import type { AppointmentParams } from '../types';
import { mockPatients, mockDoctors, mockAppointments } from '../data/mockData';
import './AppointmentDetails.css';

const AppointmentDetails: React.FC = () => {
  const { patientId, appointmentId } = useParams<AppointmentParams>();

  // Validate params are present
  if (!patientId || !appointmentId) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>Missing or invalid parameters</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  // Convert to numbers and validate
  const numericPatientId = Number(patientId);
  const numericAppointmentId = Number(appointmentId);

  if (isNaN(numericPatientId) || isNaN(numericAppointmentId)) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>Invalid ID format. IDs must be numeric.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  // Find data
  const patient = mockPatients.find(p => p.id === numericPatientId);
  const appointment = mockAppointments.find(
    a => a.id === numericAppointmentId && a.patientId === numericPatientId
  );

  if (!patient) {
    return (
      <div className="error-container">
        <h2>Patient Not Found</h2>
        <p>Patient with ID {numericPatientId} does not exist.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="error-container">
        <h2>Appointment Not Found</h2>
        <p>Appointment with ID {numericAppointmentId} does not exist for this patient.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const doctor = mockDoctors.find(d => d.id === appointment.doctorId);

  return (
    <div className="appointment-details">
      <div className="header">
        <h1>Appointment Details</h1>
        <Link to="/" className="back-button">← Back to Dashboard</Link>
      </div>

      <div className="details-grid">
        <section className="card">
          <h2>Patient Information</h2>
          <div className="info-row">
            <span className="label">Patient ID:</span>
            <span className="value">{patient.id}</span>
          </div>
          <div className="info-row">
            <span className="label">Name:</span>
            <span className="value">{patient.name}</span>
          </div>
          <div className="info-row">
            <span className="label">Age:</span>
            <span className="value">{patient.age}</span>
          </div>
          <div className="info-row">
            <span className="label">Condition:</span>
            <span className="value">{patient.condition}</span>
          </div>
        </section>

        <section className="card">
          <h2>Appointment Information</h2>
          <div className="info-row">
            <span className="label">Appointment ID:</span>
            <span className="value">{appointment.id}</span>
          </div>
          <div className="info-row">
            <span className="label">Date:</span>
            <span className="value">{appointment.date}</span>
          </div>
          <div className="info-row">
            <span className="label">Time:</span>
            <span className="value">{appointment.time}</span>
          </div>
          <div className="info-row">
            <span className="label">Type:</span>
            <span className="value">{appointment.type}</span>
          </div>
          <div className="info-row">
            <span className="label">Status:</span>
            <span className={`value status-${appointment.status.toLowerCase()}`}>
              {appointment.status}
            </span>
          </div>
        </section>

        {doctor && (
          <section className="card">
            <h2>Doctor Information</h2>
            <div className="info-row">
              <span className="label">Doctor ID:</span>
              <span className="value">{doctor.id}</span>
            </div>
            <div className="info-row">
              <span className="label">Name:</span>
              <span className="value">{doctor.name}</span>
            </div>
            <div className="info-row">
              <span className="label">Specialty:</span>
              <span className="value">{doctor.specialty}</span>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AppointmentDetails;
