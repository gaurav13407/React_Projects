// Type definitions for route parameters
export interface AppointmentParams extends Record<string, string | undefined> {
  patientId: string;
  appointmentId: string;
}

export interface DoctorPatientParams extends Record<string, string | undefined> {
  doctorId: string;
  patientId: string;
}

// Data models
export interface Patient {
  id: number;
  name: string;
  age: number;
  condition: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
}

export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  date: string;
  time: string;
  type: string;
  status: string;
}
