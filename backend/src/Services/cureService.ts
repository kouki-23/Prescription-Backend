import db from "../Config/db"
import { Cure } from "../Entities/Cure"
import { PrepMolecule } from "../Entities/PrepMolecule"
import { HttpError, StatusCode } from "../Utils/HttpError"
import { getDetailByMoleculeId } from "./detailPrepMoleculeService"

const repo = db.getRepository(Cure)

export async function getCureById(id: number) {
  return repo.findOne({
    where: { id },
    relations: {
      prepMolecule: {
        details: {
          molecule: true,
        },
      },
    },
  })
}

export async function updateCure(id: number, cure: any) {
  return repo.update({ id }, cure)
}

export async function addPrepMoleculeToCure(idCure: number, prepMolecule: any) {
  const cure = await repo.findOne({
    where: {
      id: idCure,
    },
    relations: {
      prepMolecule: true,
    },
  })
  if (!cure) {
    throw "no cure"
  }
  const detailPrepMolecule = await getDetailByMoleculeId(
    prepMolecule.moleculeId,
  )
  if (!detailPrepMolecule) {
    throw "no molecule"
  }
  const preps: PrepMolecule[] = prepMolecule.days.map((day: number) => {
    return new PrepMolecule(
      day,
      prepMolecule.dose,
      prepMolecule.unite,
      prepMolecule.perfusionType,
      true,
      cure,
      detailPrepMolecule,
    )
  })
  cure.prepMolecule = [...cure.prepMolecule, ...preps]
  await repo.save(cure)
}

// TODO : add transaction for multiple deletes
// when deleting cure it delete all the next cures( order >= deletedCure.order )
export async function deleteCure(cureId: number) {
  const cure = await repo.findOne({
    where: {
      id: cureId,
    },
  })
  if (!cure) {
    throw new HttpError("no cure with this id", StatusCode.BadRequest)
  }

  const nextCures = await repo
    .createQueryBuilder("cure")
    .select()
    .where(" cure.order > :order and cure.prescriptionId = :presid ", {
      order: cure.order,
      presid: cure.prescriptionId,
    })
    .execute()
  console.log(nextCures)
  await Promise.all([
    repo.delete({ id: cure.id }),
    ...nextCures.map((c: any) => repo.delete({ id: c.cure_id })),
  ])
}
