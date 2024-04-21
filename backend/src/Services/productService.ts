import db from "../Config/db"
import { Product } from "../Entities/Product"
import { HttpError, StatusCode } from "../Utils/HttpError"
import { Molecule } from "../Entities/Molecule"
import { ReturnDocument } from "typeorm"
import { CreateProductBody } from "../Middlewares/validation/schema"

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

export async function getAllProducts() {
  const products: Product[] = await repo.find({
    order: {
      specialite: "ASC",
    },
    relations: {
      molecule: true,
    },
  })
  return products
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

export async function getAllEnabledProducts() {
  const products: Product[] = await repo.find({
    where: {
      disabled: false,
    },
    order: {
      specialite: "ASC",
    },
    relations: {
      molecule: true,
    },
  })
  return products
}
export async function createProduct(productBody: CreateProductBody) {
  const product = new Product(
    productBody.specialite,
    productBody.dosage,
    productBody.dosageUnite,
    productBody.volume,
    productBody.volumeUnite,
    productBody.isReconstruct,
    productBody.solvantReconstitution,
    productBody.volumeReconstitution,
    productBody.volumeReconstitutionUnite,
    productBody.conservationDilutionFridge,
    productBody.dilutionVolume,
    productBody.dilutionVolumeUnite,
    productBody.minConcentration,
    productBody.maxConcentration,
    productBody.concentrationUnite,
    productBody.conservationDilutionFridge,
    productBody.conservationPeriodDilution,
    productBody.lightShelter,
    productBody.sensitivityPVC,
    productBody.disable,
  )
  return await repo.save(product)
}
export async function deleteProduct(id: number) {
  const product = await repo.findOne({
    where: {
      id: id,
    },
  })
  if (!product) throw new HttpError("produit introuvable", StatusCode.NotFound)
  await repo.delete(product)
}
