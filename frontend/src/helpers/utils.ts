import { Patient } from "./types"

export function addDaysToDate(date: Date | string, day: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + day)
  return d
}

export function diffObjects(obj1: any, obj2: any) {
  const diff: any = {}

  // Loop through the keys of the first object
  for (const key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      // If the value for the key is different in the second object
      // or the key doesn't exist in the second object
      if (!obj2.hasOwnProperty(key) || obj2[key] !== obj1[key]) {
        diff[key] = obj1[key]
      }
    }
  }

  // Loop through the keys of the second object
  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      // If the key doesn't exist in the first object
      if (!obj1.hasOwnProperty(key)) {
        diff[key] = obj2[key]
      }
    }
  }

  return diff
}

export function getDate(date: Date): string {
  return date.toISOString().split("T")[0].split("-").reverse().join("-")
}

export function getDose(
  dose: number,
  unite: string,
  patient: Patient,
  moleculeName: string,
): string {
  switch (unite) {
    case "mg/kg":
      return (dose * patient.weight).toFixed(2)
    case "mg":
      return dose.toFixed(2)
    case "mg/m²":
      let val = (dose * patient.bodySurface).toFixed(2)
      if (moleculeName && moleculeName == "Vincristine" && Number(val) > 2) {
        return "2"
      }
      return val
    case "AUC":
      return (dose * (Number(patient.clairance) + 25)).toFixed(2)
    default:
      return "-"
  }
}
