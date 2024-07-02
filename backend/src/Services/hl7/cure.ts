import { Cure } from "../../Entities/Cure";

export function fhirCureResource(cure : Cure): any {
return{
    "resourceType" : "CarePlan",
    "id": cure.id,
    "intent" : "plan",
    "status": cure.state,
    "period" : {
        "start": cure.startDate,
        //"end":
    },
    "basedon": cure.prescriptionId,
}


 }   
