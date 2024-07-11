import { Prescription } from "../../Entities/Prescription";
import { Bundle } from "../../Utils/fhir-types";
import { fhirCureResource } from "./cure";
import { fhirprepMolResource } from "./prepMolecule";


export function fhirPrescriptionRessource(prescription : Prescription): Bundle{
    
    const bundle : Bundle = {
        resourceType: "Bundle",
        type: "collection",
        entry: {
            resource: []
        }
            
        
    };
console.log(prescription)
    prescription.cures.forEach(cure =>{
        const carePlan = fhirCureResource(cure,prescription.patientId);
        bundle.entry.resource.push(carePlan);
 
        cure.prepMolecule.forEach(prepMolecule => {
            const medicationRequest = fhirprepMolResource(prepMolecule);
            bundle.entry.resource.push( medicationRequest);
        })
    });
    return bundle;

}


//create prescription fhir 
export async function createPrescription(prescriptionData : Prescription): Promise<void> {
  
    const fhirBundle: Bundle = fhirPrescriptionRessource(prescriptionData);
  
    await saveFhirBundle(fhirBundle);
   
  }
  
  async function saveFhirBundle(bundle: Bundle): Promise<void> {
    // Implement saving logic here
    
  }