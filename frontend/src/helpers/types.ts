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
