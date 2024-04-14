import { NextFunction, Request, Response } from "express"
import { IdParams } from "../Middlewares/validation/schema"
import { getProductsByMoleculeId } from "../Services/productService"
import { handleError } from "../Utils/HttpError"

export async function addProductHandler() {}

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
