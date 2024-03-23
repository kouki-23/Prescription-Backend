import db from "../Config/db"
import { PrepMolecule } from "../Entities/PrepMolecule"

const repo = db.getRepository(PrepMolecule)

export function updatePrepMolecule(idprep: number, prep: PrepMolecule) {
  return repo.update({ id: idprep }, prep)
}
