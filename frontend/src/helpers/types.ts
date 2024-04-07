export type Option<keyT> = {
  value: keyT
  label: string
}

export interface ProtocolAssociation {
  id: number
  order: number
  groupProtocol: GroupProtocol
  protocol: Protocol
}

export interface GroupProtocol {
  id: number
  name: string
  protocolAssociation: ProtocolAssociation[]
}

export enum CureState {
  EN_COURS = "En cours",
  PREVU = "Prévu",
  TERMINEE = "Terminée",
}

export interface Cure {
  id: number
  startDate: string //Date
  state: CureState
  prescription: Prescription
  prescriptionId: number
  prepMolecule: PrepMolecule[]
}

export interface PrepMolecule {
  id: number
  finalCond: string
  solventVolume: number
  finalVolume: number
  VolumePA: number
  dose: number
  unite: string
  day: number
  duration: number
  time: string
  validation: number
  theoreticalDose: number
  perfusionType: string
  isCustom: boolean
  comment?: string
  vehicule: Vehicule
  productsUsed: ProductUsed[]
  cure: Cure
  prepMoleculeHistory: PrepMoleculeHistory[]
}

export interface ProtocoleMoleculeAssociation {
  id: number
  day: number
  dose: number
  unite: string
  perfusionType: string
  molecule: Molecule
  protocol: Protocol
}

export interface Protocol {
  id: number
  name: string
  intercure: number
  nbCures: number
  details: string
  indications: string
  histoType: string
  isCreated: boolean
  disabled: boolean
  protocolAssociation: ProtocolAssociation[]
  protocolMoleculeAssociation: ProtocoleMoleculeAssociation[]
}

export enum UserRole {
  ADMIN = "admin",
  MEDECIN = "medecin",
  PHARMACIEN = "pharmacien",
}

export interface User {
  id: number
  name: string
  username: string
  password: string
  role: UserRole
  serviceType?: string
  patientHistory: PatientHistory[]
  prepMoleculeHistory: PrepMoleculeHistory
}

export interface PatientHistory extends History<Patient> {
  patient: Patient
  patientId: number
}

export interface PrepMoleculeHistory extends History<PrepMolecule> {
  prepMolecule: PrepMolecule
  prepMoleculeId: number
}

export enum HistoryActions {
  CREATE = "Create",
  UPDATE = "Update",
  DELETE = "Delete",
}

export interface DifferenceObject<T> {
  [key: string]: T[keyof T]
}

export interface History<T> {
  id: number
  modifiedBy: User
  modifiedAt: Date
  payload: DifferenceObject<T>
  action: HistoryActions
}

export interface Vehicule {
  id: number
  type: string
  content: string
  volume: string
  finalVolume: string
  prepMolucule: PrepMolecule
}

export interface ProductUsed {
  id: number
  quantityFrac: number
  prepMolecule: PrepMolecule
  prepMoleculeId: number
  product: Product
  productId: number
}

export interface Patient {
  id: number
  DMI: string
  index: string
  firstName: string
  lastName: string
  gender: string
  matrimonial: string
  birthDate: string //Date
  weight: number
  height: number
  bodySurface: number
  creatinine: number
  clairanceFormula: string
  clairance: number
  FEVG?: number
  comment?: string
  serviceType?: string
  patientHistory: PatientHistory[]
  prescription: Prescription[]
  created_at: Date
  updated_at: Date
}

export interface Product {
  id: number
  specialite: string
  dosage: number
  dosageUnite: string
  volume: number
  volumeUnite: string
  isReconstruct: boolean
  solventReconstitution: string
  volumeReconstitution: number
  volumeReconstitutionUnite: string
  conservationReconstitutionFridge: boolean
  dilutionVolume: number
  dilutionVolumeUnite: string
  minConcentrarion: number
  maxConcentrarion: number
  concentrationUnite: string
  conservrationDilutionFridge: boolean
  concervationtionPeriodDilution: number
  lightShelter: boolean
  SensivityPVC: boolean
  disabled: boolean
  ProductsUsed: ProductUsed[]
  molecule: Molecule
}

export interface Molecule {
  id: number
  name: string
  way: string
  disabled: boolean
  comment?: string
  products: Product[]
  protocoleMoleculeAssociation: ProtocoleMoleculeAssociation[]
}

export interface Prescription {
  id: number
  prescriber: string
  protocolName: string
  intercure: number
  clinicalTest: boolean
  primitif: string
  histoType: string
  comment?: string
  serviceType?: string
  patient: Patient
  patientId: number
  cures: Cure[]
}
