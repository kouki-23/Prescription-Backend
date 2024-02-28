import { number } from "zod"
import db from "../Config/db"
import { Protocol } from "../Entities/Protocol"
import { CreateProtocolBody } from "../Middlewares/validation/schema"
import { HttpError, StatusCode } from "../Utils/HttpError"
import { ProtocoleMoleculeAssociation } from "../Entities/ProtocoleMoleculeAssociation"
import { Molecule } from "../Entities/Molecule"
import { getMoleculeById, getMoleculesByIds } from "./moleculeService"
const repo = db.getRepository(Protocol)

export async function CreateProtocol(protocolb: CreateProtocolBody) {
  const protocole = new Protocol()
  protocole.id = protocolb.id
  protocole.name = protocolb.name
  protocole.intercure = protocolb.intercure
  protocole.nbCures = protocolb.nbcures
  protocole.details = protocolb.details
  protocole.indications = protocolb.indications
  protocole.histoType = protocolb.histotype
  protocole.isCreated = protocolb.iscreated
  const associations: ProtocoleMoleculeAssociation[] = await Promise.all(
    protocolb.molecules.map(async (molecule) => {
      const association = new ProtocoleMoleculeAssociation()
      association.protocol = protocole
      association.journey = molecule.journey
      association.molecule = await getMoleculeById(molecule.moleculeid)

      return association
    }),
  )
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
