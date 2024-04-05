import { MoreThan } from "typeorm"
import db from "../Config/db"
import { Cure } from "../Entities/Cure"
import { PrepMolecule } from "../Entities/PrepMolecule"
import { addPrepMoleculeToCureBody } from "../Middlewares/validation/schema"
import { HttpError, StatusCode } from "../Utils/HttpError"
import { getProductByMoleculeId } from "./productService"

const repo = db.getRepository(Cure)

/*export async function getCureById(id: number) {
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
}*/

export async function updateCure(id: number, cure: any) {
  return repo.update({ id }, cure)
}

export async function addPrepMoleculeToCure(
  idCure: number,
  prepMolecule: addPrepMoleculeToCureBody,
) {
  const cure = await repo.findOne({
    where: {
      id: idCure,
    },
    relations: {
      prepMolecule: true,
    },
  })
  if (!cure) {
    throw new HttpError("le cure est introuvable", StatusCode.BadRequest)
  }
  const product = await getProductByMoleculeId(prepMolecule.moleculeId)
  const preps: PrepMolecule[] = prepMolecule.days.map((day: number) => {
    return new PrepMolecule(
      day,
      prepMolecule.dose,
      prepMolecule.unite,
      prepMolecule.perfusionType,
      true,
      cure,
      product.id,
    )
  })
  cure.prepMolecule = [...cure.prepMolecule, ...preps]
  await repo.save(cure)
  return cure
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
    throw new HttpError("le cure est introuvable", StatusCode.BadRequest)
  }

  const nextCures = await repo.find({
    where: {
      startDate: MoreThan(cure.startDate),
      prescriptionId: cure.prescriptionId,
    },
  })
  await Promise.all([
    repo.delete({ id: cure.id }),
    ...nextCures.map((c: any) => repo.delete({ id: c.cure_id })),
  ])
}
