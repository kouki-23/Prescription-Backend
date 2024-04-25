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
  const molecule = new Molecule(
    moleculeB.name,
    moleculeB.way,
    moleculeB.comment,
  )
  return await repo.save(molecule)
}

export async function getAllMolecules() {
  const molecules: Molecule[] = await repo.find({
    order: {
      name: "ASC",
    },
    relations: {
      products: true,
    },
  })
  return molecules
}

export async function getAllEnabledMolecules() {
  const molecules: Molecule[] = await repo.find({
    where: {
      disabled: false,
    },
    order: {
      name: "ASC",
    },
  })
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
      "Aucune molécule trouvée avec cet identifiant",
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
  return result.affected && result.affected !== 0
}

export async function deleteMolecule(id: number) {
  const result = await repo.delete({
    id,
  })
  return result.affected && result.affected !== 0
}
