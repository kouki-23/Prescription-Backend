import db from "../Config/db"
import { DetailPrepMolecule } from "../Entities/DetailPrepMolecule"
import { HttpError, StatusCode } from "../Utils/HttpError"
import { Molecule } from "../Entities/Molecule"

const repo = db.getRepository(DetailPrepMolecule)

export function getDetailByMolecule(molecule: Molecule) {
  return repo.findOne({
    where: {
      molecule,
    },
    relations: {
      molecule: true,
    },
  })
}

export async function getDetailsPrepMoleculeByMoleculeId(moleculeId: number) {
  const prepMoleculedetails = await repo.findOne({
    where: {
      molecule: {
        id: moleculeId,
      },
    },
    relations: {
      molecule: true,
    },
  })
  if (!prepMoleculedetails) {
    throw new HttpError("no details found", StatusCode.NotFound)
  }
  return prepMoleculedetails
}
