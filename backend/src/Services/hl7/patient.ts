import { Patient } from "../../Entities/Patient";


export function fhirPatientResource(patient: Patient): any {    
    return {
      resourceType: "Patient",
      id: patient.id,
      name: [{
        use: "official",
        family: patient.lastName,
        given: [patient.firstName]
      }],
     

      gender: patient.gender,
      birthDate: patient.birthDate,
     
        
    };
  }
  