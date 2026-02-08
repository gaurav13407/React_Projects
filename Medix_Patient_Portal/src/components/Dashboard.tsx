import { Link } from 'react-router-dom';
import { mockPatients, mockDoctors, mockAppointments } from '../data/mockData';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Medix Patient Portal</h1>
        <p className="subtitle">Type-Safe Routing with React Router & TypeScript</p>
      </header>

      <div className="dashboard-content">
        {/* Patients Section */}
        <section className="dashboard-section">
          <h2>Patients</h2>
          <div className="cards-grid">
            {mockPatients.map(patient => {
              const patientAppointments = mockAppointments.filter(
                a => a.patientId === patient.id
              );
              return (
                <div key={patient.id} className="patient-card card">
                  <div className="card-header">
                    <h3>{patient.name}</h3>
                    <span className="id-badge">ID: {patient.id}</span>
                  </div>
                  <div className="card-body">
                    <p><strong>Age:</strong> {patient.age}</p>
                    <p><strong>Condition:</strong> {patient.condition}</p>
                    <p><strong>Appointments:</strong> {patientAppointments.length}</p>
                  </div>
                  <div className="card-actions">
                    {patientAppointments.map(appt => (
                      <Link
                        key={appt.id}
                        to={`/patients/${patient.id}/appointments/${appt.id}`}
                        className="btn btn-primary"
                      >
                        View Appointment {appt.id}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Doctors Section */}
        <section className="dashboard-section">
          <h2>Doctors</h2>
          <div className="cards-grid">
            {mockDoctors.map(doctor => {
              const doctorAppointments = mockAppointments.filter(
                a => a.doctorId === doctor.id
              );
              const patients = [...new Set(doctorAppointments.map(a => a.patientId))];
              
              return (
                <div key={doctor.id} className="doctor-card card">
                  <div className="card-header">
                    <h3>{doctor.name}</h3>
                    <span className="id-badge">ID: {doctor.id}</span>
                  </div>
                  <div className="card-body">
                    <p><strong>Specialty:</strong> {doctor.specialty}</p>
                    <p><strong>Active Patients:</strong> {patients.length}</p>
                  </div>
                  <div className="card-actions">
                    {patients.map(patientId => (
                      <Link
                        key={patientId}
                        to={`/doctors/${doctor.id}/patients/${patientId}`}
                        className="btn btn-secondary"
                      >
                        View Patient {patientId}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="dashboard-section stats-section">
          <h2>Quick Stats</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{mockPatients.length}</div>
              <div className="stat-label">Total Patients</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{mockDoctors.length}</div>
              <div className="stat-label">Total Doctors</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{mockAppointments.length}</div>
              <div className="stat-label">Total Appointments</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {mockAppointments.filter(a => a.status === 'Scheduled').length}
              </div>
              <div className="stat-label">Scheduled</div>
            </div>
          </div>
        </section>

        {/* Features Demonstration */}
        <section className="dashboard-section features-section">
          <h2>Type-Safe Routing Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>✓ Dynamic Route Parameters</h3>
              <p>Routes like <code>/patients/:patientId/appointments/:appointmentId</code></p>
            </div>
            <div className="feature-card">
              <h3>✓ TypeScript Type Safety</h3>
              <p>Strongly typed params with <code>useParams&lt;T&gt;()</code></p>
            </div>
            <div className="feature-card">
              <h3>✓ Parameter Validation</h3>
              <p>Numeric ID validation and error handling</p>
            </div>
            <div className="feature-card">
              <h3>✓ Type-Safe Navigation</h3>
              <p>Compile-time checks for route parameters</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
