import db from "../Config/db"
import { Vehicule } from "../Entities/Vehicule"
import { HttpError, StatusCode } from "../Utils/HttpError"

const repo = db.getRepository(Vehicule)

export async function getAllVehicules() {
  return repo.find()
}

export async function getVehiculeById(id: number) {
  const vehicule = await repo.findOneBy({ id })

  if (!vehicule) {
    throw new HttpError("not found", StatusCode.NotFound)
  }
  return vehicule
}
