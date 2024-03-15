import db from "../Config/db"
import { Cure } from "../Entities/Cure"
import { PrepMolecule } from "../Entities/PrepMolecule"
import { HttpError, StatusCode } from "../Utils/HttpError"
import { getDetailsPrepMoleculeByMoleculeId } from "./detailPrepMoleculeService"

const repo = db.getRepository(Cure)
export async function getCureById(id: number) {
  const cure = await repo.findOne({
    where: {
      id,
    },
  })
  if (!cure) {
    throw new HttpError("No cure fonud", StatusCode.NotFound)
  }
  return cure
}

export async function addMoleculetoCure(
  moleculeid: number,
  cureid: number,
  day: number,
) {
  const cure = getCureById(cureid)
  const detailsPrepMolecule = getDetailsPrepMoleculeByMoleculeId(moleculeid)
  const prepMolecule = new PrepMolecule()
}
