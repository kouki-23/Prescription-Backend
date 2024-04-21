import { Response, Request, NextFunction } from "express"
import { handleError } from "../Utils/HttpError"
import { getAllVehicules } from "../Services/vehiculeService"

export async function getAllVehiculesHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const vehicules = await getAllVehicules()
    res.json(vehicules)
  } catch (error) {
    return next(handleError(error))
  }
}
