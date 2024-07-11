import { Cure } from "../../Entities/Cure";
import { CarePlan } from "../../Utils/fhir-types";

export function fhirCureResource(cure : Cure,patientId: number): CarePlan  {
return{
    "resourceType" : "CarePlan",
    "id": cure.id,
    "intent" : "plan",
    "status": cure.state,    // (encours,prévu,basedon)
    "period" : {
        "start": cure.startDate,
        //"end":
    },
    "basedon": cure.prescriptionId,
    "subject": patientId,
}


 }   
