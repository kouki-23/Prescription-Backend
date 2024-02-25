import db from "../Config/db"
import { Molecule } from "../Entities/Molecule"
import { CreateMoleculeBody } from "../Middlewares/validation/schema"

const repo = db.getRepository(Molecule)

export async function createMolecule(moleculeB: CreateMoleculeBody) {
  const molecule = new Molecule()
  molecule.name = moleculeB.name
  molecule.dose = moleculeB.dose
  molecule.formula = moleculeB.formula
  molecule.unite = moleculeB.unite
  molecule.prodDay = moleculeB.prodDay
  molecule.way = moleculeB.way
  molecule.perfusionType = moleculeB.perfusionType
  molecule.perfusionDuration = moleculeB.perfusionDuration
  molecule.vehicule = moleculeB.vehicule
  molecule.finalVolume = moleculeB.finalVolume
  molecule.comment = moleculeB.comment
  return await repo.save(molecule)
}

export async function getAllMolecules() {
  const molecules: Molecule[] = await repo.find()
  return molecules
}
