export type Option<keyT> = {
  value: keyT
  label: string
}

export interface Patient {
  id: number
  DMI: number
  index: number
  firstName: string
  lastName: string
  gender: string
  matrimonial: string
  birthDate: string
  weight: number
  height: number
  bodySurface: number
  creatinine: number
  clairanceFormula: string
  clairance: number
  comment?: string
  serviceType?: string
  //dataHistory: DataHistory[];
  //prescription: Prescription[];
}

export interface Molecule {
  name: string
  way: string
  perfusionType: string
  comment: string
  id: number
  protocoleMoleculeAssociation: ProtocoleMoleculeAssociation[]
}

export interface ProtocoleMoleculeAssociation {
  id: number
  day: number
  dose: number
  unite: string
}

export interface Details {
  id: number
  dci: string
  specialite: string
  volume: string
  volumeUnite: string
  isReconstruct: boolean
  solventReconstitution: string
  volumeReconstitution: string
  volumeReconstitutionUnity: string
  conservationReconstitutionFridge: boolean
  dilutionVolume: number
  dilutionVolumeUnite: string
  minConcentrarion: string
  maxConcentrarion: string
  concentrationUnite: string
  conservrationDilutionFridge: boolean
  concervationtionPeriodDilution: number
  lightShelter: boolean
  SensivityPVC: boolean
  molecule: Molecule
}

export interface PrepMolecule {
  day: number
  finalCond: string
  solventVolume: number
  finalVolume: number
  VolumePA: number
  dose: number
  unite: string
  time: string
  duration: number
  validation: number
  theoreticalDose: number
  perfusionType: string
  isCustom: boolean
  details: Details
  id: number
}

export interface Cure {
  order: number
  startDate: string
  state: string
  prepMolecule: PrepMolecule[]
  id: number
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
}

export interface PatientData {
  id: number
  DMI: number
  index: number
  firstName: string
  lastName: string
  gender: string
  matrimonial: string
  birthDate: string
  weight: number
  height: number
  bodySurface: number
  creatinine: number
  clairanceFormula: string
  clairance: number
  comment: string
  serviceType: string
}

export interface Prescription {
  prescriber: string
  clinicalTest: boolean
  comment?: string
  serviceType: string
  patient: PatientData
  protocol: Protocol
  cures: Cure[]
  id: number
}
