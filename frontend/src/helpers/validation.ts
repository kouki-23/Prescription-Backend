export function isEmpty(word: string): boolean {
  return word.trim() === ""
}

export function isOnlyLetter(word: string): boolean {
  for (let i = 0; i < word.length; i++) {
    const char = word[i].toUpperCase()
    if (!(char >= "A" && char <= "Z")) {
      return false
    }
  }
  return true
}

export function isInteger(num: number): boolean {
  return Number.isSafeInteger(num)
}

export function isPositif(num: number): boolean {
  return num > 0
}

export function isFloat(num: number): boolean {
  return Number.isFinite(num)
}

export function isDateInPast(dateString: string): boolean {
  const date = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date <= today
}
