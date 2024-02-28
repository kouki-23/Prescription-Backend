import db from "../Config/db"
import { Molecule } from "../Entities/Molecule"
import {
  CreateMoleculeBody,
  UpdateMoleculeBody,
} from "../Middlewares/validation/schema"
import { HttpError, StatusCode } from "../Utils/HttpError"
import { In } from "typeorm"

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

export async function getMoleculesByIds(ids: number[]) {
  const molecules: Molecule[] = await repo.findBy({
    id: In(ids),
  })
  return molecules
}

export async function getMoleculeById(id: number) {
  const molecule = await repo.findOne({
    where: {
      id,
    },
  })
  if (!molecule)
    throw new HttpError(
      "No molecule found having this id ",
      StatusCode.NotFound,
    )
  return molecule
}

export async function UpdateMolecule(id: number, molecule: UpdateMoleculeBody) {
  const result = await repo.update(
    {
      id,
    },
    molecule,
  )
  if (!result.affected || result.affected === 0) {
    return false
  }
  return true
}

export async function deleteMolecule(id: number) {
  const result = await repo.delete({
    id,
  })
  if (!result.affected || result.affected === 0) {
    return false
  } else return true
}
