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
export async function getProductById(id: number) {
  const product = await repo.findOne({
    where: {
      id,
    },
  })
  if (!product) {
    throw new HttpError(
      "Aucune spécialité trouvée avec cet identifiant",
      StatusCode.NotFound,
    )
  }
  return product
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
  const products = productBody.flacons.map((flacon) => {
    return new Product(
      productBody.moleculeId,
      productBody.specialite,
      flacon.dosage,
      "mg",
      flacon.volume,
      "ml",
      productBody.isReconstruct,
      productBody.solventReconstitution,
      productBody.volumeReconstitution,
      "ml",
      productBody.conservationDilutionFridge,
      productBody.dilutionVolume,
      "ml",
      productBody.minConcentration,
      productBody.maxConcentration,
      "mg/ml",
      productBody.conservationDilutionFridge,
      productBody.conservationPeriodDilution,
      productBody.lightShelter,
      productBody.SensibilityPVC,
      false,
    )
  })
  return await repo.save(products)
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
