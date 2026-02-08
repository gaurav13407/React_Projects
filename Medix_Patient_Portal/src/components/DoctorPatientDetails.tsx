import { useParams, Link } from 'react-router-dom';
import type { DoctorPatientParams } from '../types';
import { mockPatients, mockDoctors, mockAppointments } from '../data/mockData';
import './DoctorPatientDetails.css';

const DoctorPatientDetails: React.FC = () => {
  const { doctorId, patientId } = useParams<DoctorPatientParams>();

  // Validate params are present
  if (!doctorId || !patientId) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>Missing or invalid parameters</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  // Convert to numbers and validate
  const numericDoctorId = Number(doctorId);
  const numericPatientId = Number(patientId);

  if (isNaN(numericDoctorId) || isNaN(numericPatientId)) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>Invalid ID format. Both doctor ID and patient ID must be numeric.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  // Find data
  const doctor = mockDoctors.find(d => d.id === numericDoctorId);
  const patient = mockPatients.find(p => p.id === numericPatientId);

  if (!doctor) {
    return (
      <div className="error-container">
        <h2>Doctor Not Found</h2>
        <p>Doctor with ID {numericDoctorId} does not exist.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="error-container">
        <h2>Patient Not Found</h2>
        <p>Patient with ID {numericPatientId} does not exist.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  // Find appointments between this doctor and patient
  const appointments = mockAppointments.filter(
    a => a.doctorId === numericDoctorId && a.patientId === numericPatientId
  );

  return (
    <div className="doctor-patient-details">
      <div className="header">
        <h1>Doctor-Patient Relationship</h1>
        <Link to="/" className="back-button">← Back to Dashboard</Link>
      </div>

      <div className="details-grid">
        <section className="card doctor-card">
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

        <section className="card patient-card">
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

        <section className="card appointments-card full-width">
          <h2>Appointments History</h2>
          {appointments.length === 0 ? (
            <p className="no-appointments">No appointments found between this doctor and patient.</p>
          ) : (
            <div className="appointments-list">
              {appointments.map(appointment => (
                <div key={appointment.id} className="appointment-item">
                  <div className="appointment-info">
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
                  </div>
                  <Link 
                    to={`/patients/${patient.id}/appointments/${appointment.id}`}
                    className="view-details-btn"
                  >
                    View Full Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default DoctorPatientDetails;
