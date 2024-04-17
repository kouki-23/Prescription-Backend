import db from "../Config/db"
import { HistoryActions } from "../Entities/HistoryEntities/History"
import { PrepMoleculeHistory } from "../Entities/HistoryEntities/PrepMoleculeHistory"
import { PrepMolecule } from "../Entities/PrepMolecule"
import { ProductUsed } from "../Entities/ProductUsed"
import { AdjustPrepMoleculeBody } from "../Middlewares/validation/schema"
import { HttpError, StatusCode } from "../Utils/HttpError"
import { getDifference } from "../Utils/helpers"
import { deleteProductUsedByPrepMoleculeId } from "./productUsedService"
import { getVehiculeById } from "./vehiculeService"

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

export async function getAllValidPrepMolecules() {
  return repo.find({
    where: {
      validation: 2,
    },
    relations: {
      vehicule: true,
      cure: {
        prescription: {
          patient: true,
        },
      },
      productsUsed: {
        product: {
          molecule: true,
        },
      },
    },
  })
}

export async function getPrepMoleculeById(id: number) {
  const prep = await repo.findOne({
    where: {
      id,
    },
    relations: {
      vehicule: true,
      cure: {
        prescription: {
          patient: true,
        },
      },
      productsUsed: {
        product: {
          molecule: true,
        },
      },
    },
  })
  if (!prep) {
    throw new HttpError("", StatusCode.NotFound)
  }
  return prep
}

export async function adjustPrepMolecule(
  prepMoleculeId: number,
  data: AdjustPrepMoleculeBody,
  userId: number,
) {
  const prepMolecule = await repo.findOne({
    where: {
      id: prepMoleculeId,
    },
    relations: {
      productsUsed: true,
    },
  })

  if (!prepMolecule) {
    throw new HttpError("not found", StatusCode.NotFound)
  }
  const oldPrep = { ...prepMolecule }
  const oldProductUsed = [...prepMolecule.productsUsed]
  //remove default used product
  await deleteProductUsedByPrepMoleculeId(prepMolecule.id)
  prepMolecule.productsUsed = []

  const vehicule = await getVehiculeById(data.vehiculeId)
  prepMolecule.vehicule = vehicule

  prepMolecule.solventVolume = data.volumeSolvant
  prepMolecule.finalCond = data.condFinal

  let productUseds: ProductUsed[] = []
  data.repartitionProducts.forEach((value) => {
    if (value.quantity > 0)
      productUseds.push(
        new ProductUsed(
          prepMolecule,
          value.productId,
          value.quantity,
          value.frac,
        ),
      )
  })
  data.fractionProducts.forEach((value) => {
    if (value.quantity > 0)
      productUseds.push(
        new ProductUsed(
          prepMolecule,
          value.productId,
          value.quantity,
          value.frac,
        ),
      )
  })

  prepMolecule.isAdjusted = true
  prepMolecule.productsUsed = productUseds
  try {
    await repo.save(prepMolecule)
    repoHistory.save(
      new PrepMoleculeHistory(
        getDifference<PrepMolecule>(oldPrep, prepMolecule)!,
        userId,
        prepMolecule.id,
        HistoryActions.UPDATE,
      ),
    )
  } catch (e) {
    prepMolecule.productsUsed = oldProductUsed
    await repo.save(prepMolecule)
    throw e
  }
}

export async function libratePrepMolecule(id: number, userId: number) {
  const prepMolecule = await repo.findOne({
    where: {
      id,
    },
  })
  if (!prepMolecule) {
    throw new HttpError("not found", StatusCode.NotFound)
  }
  const oldPrep = { ...prepMolecule }
  prepMolecule.isAdjusted = false
  prepMolecule.finished = false

  await repo.save(prepMolecule)
  await repoHistory.save(
    new PrepMoleculeHistory(
      getDifference<PrepMolecule>(oldPrep, prepMolecule)!,
      userId,
      prepMolecule.id,
      HistoryActions.UPDATE,
    ),
  )
}

export async function softDeletePrepMoleculeByPrescriptionId(
  prescriptionId: number,
) {
  await repo.softRemove({ cure: { prescription: { id: prescriptionId } } })
}
