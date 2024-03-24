import db from "../Config/db"
import { Protocol } from "../Entities/Protocol"
import { CreateProtocolBody } from "../Middlewares/validation/schema"
import { HttpError, StatusCode } from "../Utils/HttpError"
import { ProtocoleMoleculeAssociation } from "../Entities/ProtocoleMoleculeAssociation"
import { getMoleculeById } from "./moleculeService"

const repo = db.getRepository(Protocol)

export async function CreateProtocol(protocolb: CreateProtocolBody) {
  const id = (
    await repo.createQueryBuilder().select("MAX(id)", "maxId").getRawOne()
  ).maxId
  console.log(id)
  const protocole = new Protocol(
    id + 1,
    protocolb.name,
    protocolb.intercure,
    protocolb.nbCures,
    protocolb.details,
    protocolb.indications,
    protocolb.histoType,
    [],
    [],
  )

  const associations: ProtocoleMoleculeAssociation[] = (
    await Promise.all(
      protocolb.molecules.map(async (mol) => {
        const molecule = await getMoleculeById(mol.moleculeId)
        const association: ProtocoleMoleculeAssociation[] = mol.days.map(
          (day) =>
            new ProtocoleMoleculeAssociation(
              day,
              mol.unite,
              mol.dose,
              mol.perfusionType,
              molecule,
              protocole,
            ),
        )
        return association
      }),
    )
  ).flat()

  protocole.protocolMoleculeAssociation = associations
  return await repo.save(protocole)
}

export async function getAllProtocols() {
  const protocols: Protocol[] = await repo.find()
  return protocols
}

export async function getProtocolWithMolecules(id: number) {
  const protocol: Protocol | null = await repo.findOne({
    where: { id },
    relations: {
      protocolMoleculeAssociation: {
        molecule: true,
      },
    },
  })
  if (!protocol) throw new HttpError("patient not found", StatusCode.NotFound)
  return protocol
}

export async function deleteProtocol(id: number) {
  const result = await repo.delete({
    id,
  })
  if (!result.affected || result.affected === 0) {
    return false
  }
  return true
}
