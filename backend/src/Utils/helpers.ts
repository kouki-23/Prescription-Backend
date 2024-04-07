export interface DifferenceObject<T> {
  [key: string]: T[keyof T]
}

export function getDifference<T extends object>(
  obj1: T,
  obj2: any,
): DifferenceObject<T> | null {
  const diffObj: DifferenceObject<T> = {}

  const props = Object.getOwnPropertyNames(obj1) as (keyof T)[]

  for (const prop of props) {
    if (typeof obj1[prop] === "object" || typeof obj2[prop] === "object")
      continue
    if (obj1[prop] !== obj2[prop]) {
      diffObj[prop as string] = obj2[prop]
    }
  }

  if (Object.keys(diffObj).length === 0) {
    return null
  }
  return diffObj
}

export function getHistoryPayload<T extends object>(
  obj1: T,
): DifferenceObject<T> {
  const diffObj: DifferenceObject<T> = {}
  const props = Object.getOwnPropertyNames(obj1) as (keyof T)[]
  for (const prop of props) {
    diffObj[prop as string] = obj1[prop]
  }
  return diffObj
}
