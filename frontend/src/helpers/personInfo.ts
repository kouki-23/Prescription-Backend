export function getAge(date: Date): number {
  const today = new Date()
  const birthYear = date.getFullYear()
  const currentYear = today.getFullYear()

  let age = currentYear - birthYear
  if (age < 0) return -1
  if (
    today.getMonth() < date.getMonth() ||
    (today.getMonth() === date.getMonth() && today.getDate() < date.getDate())
  ) {
    age--
  }

  return age
}

export function getClairance(
  formula: string,
  gender: string,
  creatinine: number,
  age: number,
  weight: number,
): number {
  let clcr: number = 0
  if (formula == "mdrd") {
    if (gender == "homme") {
      clcr = 186 * Math.pow(creatinine / 88.4, -1.154) * Math.pow(age, -0.203)
    } else if (gender == "femme") {
      clcr =
        186 *
        Math.pow(creatinine / 88.4, -1.154) *
        Math.pow(age, -0.203) *
        0.742
    }
  } else if (formula == "cockroft") {
    if (gender == "homme") {
      clcr = (1.23 * weight * (140 - age)) / creatinine
    } else if (gender == "femme") {
      clcr = (1.04 * weight * (140 - age)) / creatinine
    }
  } else {
    clcr = 0
  }

  clcr = Math.round(clcr * 100) / 100
  return clcr
}

export function getBodySurf(weight: number, height: number): number {
  let surf = Math.sqrt((weight * height) / 3600)
  return Math.round(surf * 100) / 100
}
