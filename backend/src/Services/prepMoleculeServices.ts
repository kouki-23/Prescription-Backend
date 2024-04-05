import db from "../Config/db"
import { HistoryActions } from "../Entities/HistoryEntities/History"
import { PrepMoleculeHistory } from "../Entities/HistoryEntities/PrepMoleculeHistory"
import { PrepMolecule } from "../Entities/PrepMolecule"
import { HttpError, StatusCode } from "../Utils/HttpError"
import { getDifference } from "../Utils/helpers"

const repo = db.getRepository(PrepMolecule)
const repoHistory = db.getRepository(PrepMoleculeHistory)

export async function updatePrepMolecule(
  idprep: number,
  prep: PrepMolecule,
  userId: number,
) {
  const prepMolecule = await repo.findOneBy({ id: idprep })
  if (!prepMolecule) {
    throw new HttpError("prep molecule introuvable", StatusCode.NotFound)
  }
  const diff = getDifference<PrepMolecule>(prepMolecule, prep)
  if (!diff) {
    return null
  }
  await repo.update({ id: idprep }, diff)
  await repoHistory.save(
    new PrepMoleculeHistory(diff, userId, idprep, HistoryActions.UPDATE),
  )

  return diff
}
