import type { Patient, Doctor, Appointment } from '../types';

export const mockPatients: Patient[] = [
  { id: 1, name: "John Smith", age: 45, condition: "Hypertension" },
  { id: 2, name: "Sarah Johnson", age: 32, condition: "Diabetes Type 2" },
  { id: 3, name: "Michael Brown", age: 58, condition: "Asthma" },
  { id: 4, name: "Emily Davis", age: 28, condition: "Annual Checkup" },
];

export const mockDoctors: Doctor[] = [
  { id: 1, name: "Dr. James Wilson", specialty: "Cardiology" },
  { id: 2, name: "Dr. Lisa Martinez", specialty: "Endocrinology" },
  { id: 3, name: "Dr. Robert Chen", specialty: "Pulmonology" },
  { id: 4, name: "Dr. Amanda Taylor", specialty: "General Practice" },
];

export const mockAppointments: Appointment[] = [
  { id: 101, patientId: 1, doctorId: 1, date: "2026-02-15", time: "10:00 AM", type: "Follow-up", status: "Scheduled" },
  { id: 102, patientId: 2, doctorId: 2, date: "2026-02-16", time: "2:00 PM", type: "Consultation", status: "Scheduled" },
  { id: 103, patientId: 3, doctorId: 3, date: "2026-02-17", time: "11:30 AM", type: "Check-up", status: "Scheduled" },
  { id: 104, patientId: 4, doctorId: 4, date: "2026-02-18", time: "9:00 AM", type: "Annual Physical", status: "Scheduled" },
  { id: 123, patientId: 1, doctorId: 2, date: "2026-02-20", time: "3:00 PM", type: "Lab Review", status: "Pending" },
];
