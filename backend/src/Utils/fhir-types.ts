import { Cure } from "../Entities/Cure";


export interface Resource {
    resourceType: string;
}

export interface patient extends Resource {
    resourceType: "Patient";
    id: string;
    name: {
      use: string;
      family: string;
      given: string[];
    }[];
    gender: string;
    birthDate: string;
  }
  

export interface Bundle extends Resource {
    resourceType: "Bundle"; 
    type: string;
    entry:
    { 
        resource: (CarePlan | MedicationRequest)[] 

     }
}

export interface CarePlan extends Resource {
    resourceType: "CarePlan";
    id: number,
    intent: string;
    status: string 
    period : {
        start: Date,
    } 
    basedon: number,
    subject: number,
}

export interface MedicationRequest extends Resource {
    resourceType: "MedicationRequest";
    id?: number; 
    status: string; 
    intent: string; 
    subject: {
        reference: Cure; 
    };
    dosageInstruction?: Array<{
        timing: {
            repeat: {
                period: number;
                periodUnit: string;
                timeOfDay?: string[];
                dayOfWeek?: number[];
            }
        };
        doseAndRate?: Array<{
            doseQuantity: {
                value: number;
                unit: string;
            }
        }>;
        route: {
            coding: {
                system: string;
                display: string;
            }
        }
    }>;
    note?: {
        text: string|undefined,
    }[]
}
