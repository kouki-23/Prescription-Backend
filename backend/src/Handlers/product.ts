import { Response, Request, NextFunction } from "express"
import { CreateProductBody, IdParams } from "../Middlewares/validation/schema"
import { Product } from "../Entities/Product"
import { StatusCode, handleError } from "../Utils/HttpError"
import { UserRole } from "../Entities/User"
import {
  createProduct,
  deleteProduct,
  getAllEnabledProducts,
  getAllProducts,
} from "../Services/productService"
import { getProductsByMoleculeId } from "../Services/productService"

export async function getAllProductsHandler(
  req: Request<never, never, CreateProductBody, never>,
  res: Response,
  next: NextFunction,
) {
  try {
    let products: Product[] = []
    if (req.user?.role == UserRole.ADMIN) {
      products = await getAllProducts()
    } else {
      products = await getAllEnabledProducts()
    }
    res.json(products)
  } catch (e) {
    return next(handleError(e))
  }
}
export async function createProductHandler(
  req: Request<never, never, CreateProductBody, never>,
  res: Response,
  next: NextFunction,
) {
  try {
    await createProduct(req.body)
    return res.sendStatus(StatusCode.Ok)
  } catch (e) {
    next(handleError(e))
  }
}

export async function addProductHandler() {}

export async function deleteProductHandler(
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    await deleteProduct(Number(id))
    res.sendStatus(StatusCode.NoContent)
  } catch (e) {
    next(handleError(e))
  }
}

export async function getProductsOfMoleculeHandler(
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params
  try {
    const products = await getProductsByMoleculeId(Number(id))
    return res.json(products)
  } catch (e) {
    return next(handleError(e))
  }
}
