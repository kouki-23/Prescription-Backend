import db from "../Config/db"
import { DetailPrepMolecule } from "../Entities/DetailPrepMolecule"
import { HttpError, StatusCode } from "../Utils/HttpError"

const repo = db.getRepository(DetailPrepMolecule)

export async function getDetailsPrepMoleculeByMoleculeId(moleculeid: number) {
  const prepMoleculedetails = await repo.findOne({
    where: {
      molecule: {
        id: moleculeid,
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
