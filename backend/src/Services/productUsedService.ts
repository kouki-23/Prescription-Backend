import db from "../Config/db"
import { ProductUsed } from "../Entities/ProductUsed"

const repo = db.getRepository(ProductUsed)

export async function deleteProductUsedByPrepMoleculeId(
  prepMoleculeId: number,
) {
  await repo.delete({
    prepMoleculeId: prepMoleculeId,
  })
}
