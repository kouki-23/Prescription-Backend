import { PrepMolecule } from "../../Entities/PrepMolecule";

export function fhirprepMolResource(prepMolecule : PrepMolecule): any {    
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
                        "timeofDay": [
                            prepMolecule.time
                        ],
                        "dayofWeek": [
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
