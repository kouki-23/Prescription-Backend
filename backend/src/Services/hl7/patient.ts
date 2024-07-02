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
      /* "extension" : [
      {
        "extension" : [
          {
            url: "http://example.org/fhir/StructureDefinition/height",
            valueQuantity: {
              value: patient.height,
              unit: "cm",
              system: "http://unitsofmeasure.org",
              code: "cm"
            }
          },
        {"extension" : [
            {
              url: "http://example.org/fhir/StructureDefinition/weight",
              valueQuantity: {
                value: patient.weight,
                unit: "kg",
                system: "http://unitsofmeasure.org",
                code: "kg"
              }
            }
          ]
        }
        ]
      }
      ], */

      gender: patient.gender,
      birthDate: patient.birthDate,
     
        
    };
  }
  