import db from "../Config/db"
import { Product } from "../Entities/Product"
import { HttpError, StatusCode } from "../Utils/HttpError"
import { Molecule } from "../Entities/Molecule"

const repo = db.getRepository(Product)

export async function getProductByMolecule(molecule: Molecule) {
  const product = await repo.findOne({
    where: {
      molecule,
    },
    relations: {
      molecule: true,
    },
  })
  if (!product) throw new HttpError("product introuvable", StatusCode.NotFound)
  return product
}

// it will get Product with highest dose
export async function getProductByMoleculeId(moleculeId: number) {
  const product = await repo.findOne({
    where: {
      molecule: {
        id: moleculeId,
      },
    },
    order: {
      dosage: "DESC",
    },
  })
  if (!product)
    throw new HttpError(
      "Il n'y a pas de produit de cette molécule",
      StatusCode.NotFound,
    )
  return product
}

export async function getProductsByMoleculeId(moleculeId: number) {
  const products = await repo.find({
    where: {
      molecule: {
        id: moleculeId,
      },
    },
    order: {
      dosage: "DESC",
    },
  })
  return products
}
