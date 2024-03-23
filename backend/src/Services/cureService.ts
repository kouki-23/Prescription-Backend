import db from "../Config/db"
import { Cure } from "../Entities/Cure"
import { PrepMolecule } from "../Entities/PrepMolecule"
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
      cure,
      detailPrepMolecule,
    )
  })
  cure.prepMolecule = [...cure.prepMolecule, ...preps]
  await repo.save(cure)
}
