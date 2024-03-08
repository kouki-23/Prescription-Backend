import { Cure } from "../Entities/Cure"
import { Prescription } from "../Entities/Prescription"
import { CreatePrescriptionBody } from "../Middlewares/validation/schema"
import { getPatientById } from "./patientService"
import { getProtocolWithMolecules } from "./protocolService"

/*export async function createPrescrptition(data: CreatePrescriptionBody) {
  let patient = await getPatientById(data.patientId)
  let protocol = await getProtocolWithMolecules(data.protocolId)
  let prescription = new Prescription(
    data.prescriber,
    data.nbCures,
    data.intercure,
    new Date(data.startDate),
    data.clinicalTest,
    data.serviceType,
    patient,
    protocol,
    [],
  )
  for (let i = 0 ; i<data.nbCures ; i++ ){
    let cure = new Cure()
  }
}*/
