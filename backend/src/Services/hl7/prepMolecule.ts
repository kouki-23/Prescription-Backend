import { PrepMolecule } from "../../Entities/PrepMolecule";
import { MedicationRequest } from "../../Utils/fhir-types";

export function fhirprepMolResource(prepMolecule : PrepMolecule): MedicationRequest {    
    return {
        "resourceType": "MedicationRequest",
        "id": prepMolecule.id,
        "status": prepMolecule.finished ? "completed": "active",
        "intent": "order",
        "subject":{
            "reference": prepMolecule.cure,
        },
        "dosageInstruction":[
            {

                "timing":{
                    "repeat":{
                        //"frequency":
                        "period": prepMolecule.duration,
                        "periodUnit":"d",
                        "timeOfDay": [
                            prepMolecule.time
                        ],
                        "dayOfWeek": [
                            prepMolecule.day
                        ]
                }
            },
            "doseAndRate" : [
                {
                    "doseQuantity": {
                        "value": prepMolecule.dose,
                        "unit": prepMolecule.unite
                }}
            ],
            "route": {
                "coding": 
                    {
                        "system": "http://snomed.info/sct",
                        "display": prepMolecule.perfusionType
                        
                        
                    }
            }
            },
        ],
        "note": [
        {
            "text": prepMolecule.comment,
        }
        ]
     
        }
        

    }
