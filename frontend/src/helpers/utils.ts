export function addDaysToDate(date: Date | string, day: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + day - 1)
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
