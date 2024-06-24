// utils/fhirUtils.ts
export function fhirPatientResource(patient: any): any {    
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
      address: [{
        use: "home",
        line: [patient.address],
        city: patient.city,
        state: patient.state,
        postalCode: patient.postalCode,
        country: patient.country
      }],
      telecom: [{
        system: "phone",
        value: patient.phone,
        use: "home"
      }],
    };
  }
  