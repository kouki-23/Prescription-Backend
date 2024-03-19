import db from "../Config/db"
import { Cure } from "../Entities/Cure"

const repo = db.getRepository(Cure)

export async function getCureById(id: number) {
  return repo.findOneBy({ id })
}

export async function updateCure(id: number, cure: any) {
  return repo.update({ id }, cure)
}
