import { Prescription } from "../../Entities/Prescription";
import { fhirCureResource } from "./cure";
import { fhirprepMolResource } from "./prepMolecule";

export function fhirPrescriptionRessource(prescription : Prescription) :any{
    
    const bundle = {
        resourceType: "Bundle",
        type: "collection",
        entry: []
    };

    prescription.cures.forEach(cure =>{
        const carePlan = fhirCureResource(cure);
        bundle.entry.push(<never> {resource: carePlan});
        cure.prepMolecule.forEach(prepMolecule => {
            const medicationRequest = fhirprepMolResource(prepMolecule);
            bundle.entry.push(<never> {resource: medicationRequest});
        })
    });

    return bundle;
}