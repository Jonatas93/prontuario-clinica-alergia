export interface Address {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

export interface Patient {
  id: string
  name: string
  cpf: string
  birthDate: string
  phone: string
  email: string
  address: Address
  insurance: string
  bloodType?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export type AppointmentStatus = 'scheduled' | 'confirmed' | 'cancelled' | 'completed'
export type AppointmentType = 'consultation' | 'return' | 'exam' | 'procedure'

export interface Appointment {
  id: string
  patientId: string
  date: string
  time: string
  duration: number
  doctor: string
  type: AppointmentType
  status: AppointmentStatus
  reason?: string
  notes?: string
  createdAt: string
}

export interface Prescription {
  medication: string
  dosage: string
  frequency: string
  duration: string
  notes?: string
}

export interface MedicalRecord {
  id: string
  patientId: string
  appointmentId?: string
  date: string
  doctor: string
  chiefComplaint: string
  physicalExam: string
  diagnosis: string
  treatment: string
  allergiesIdentified: string[]
  prescriptions: Prescription[]
  followUp?: string
  notes?: string
  createdAt: string
}

export type UserRole = 'admin' | 'medico' | 'enfermeiro'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  username: string
  password: string
  crm?: string
  coren?: string
  specialty?: string
  status: 'ativo' | 'inativo'
  createdAt: string
  updatedAt: string
}

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
}
