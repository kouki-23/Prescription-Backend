import FHIR from "fhir-kit-client";
import { Prescription } from "../../Entities/Prescription";
import { Bundle } from "../../Utils/fhir-types";
import { fhirCureResource } from "./cure";
import { fhirprepMolResource } from "./prepMolecule";
import { CureState } from "../../Entities/Cure";


const axios = require('axios')

export function fhirPrescriptionResource(prescription : Prescription): Bundle{
    
    const bundle : Bundle = {
        resourceType: "Bundle",
        type: "collection",
        total: prescription.intercure,
        entry: {
            resource: []
        },

        status: "active"   
        
    };


    let allCuresFinished = true
    prescription.cures.forEach(cure =>{
        const carePlan = fhirCureResource(cure,prescription.patientId);
        bundle.entry.resource.push(carePlan);
 
        cure.prepMolecule.forEach(prepMolecule => {
            const medicationRequest = fhirprepMolResource(prepMolecule);
            bundle.entry.resource.push( medicationRequest);
        })
        //determine the prescription status depending on cure's state
        if(cure.state!== CureState.TERMINEE){
            allCuresFinished = false
        }
    });

    if (allCuresFinished) {
        bundle.status = "completed"; // Update bundle status to completed if all cures are finished
    }
    
    return bundle;

}


//create prescription fhir 
export async function createPrescription(prescriptionData: Prescription): Promise<void> {
    const fhirBundle: Bundle = await fhirPrescriptionResource(prescriptionData);

    await saveFhirBundle(fhirBundle);
  }


 // Function to save the FHIR bundle to the HAPI FHIR server
 
 async function saveFhirBundle(bundle: Bundle): Promise<void> {
  try {
    const response = await axios.post('localhost:3006/hl7prescription', bundle);
    console.log('Server response:', response.data);
  } catch (error) {
    console.error('Error saving bundle:', error) // Log  error 
  }
}
