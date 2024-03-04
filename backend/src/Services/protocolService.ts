import db from "../Config/db"
import { Protocol } from "../Entities/Protocol"
import { CreateProtocolBody } from "../Middlewares/validation/schema"
import { HttpError, StatusCode } from "../Utils/HttpError"
import { ProtocoleMoleculeAssociation } from "../Entities/ProtocoleMoleculeAssociation"
import { getMoleculeById } from "./moleculeService"
import { Molecule } from "../Entities/Molecule"

const repo = db.getRepository(Protocol)

export async function CreateProtocol(protocolb: CreateProtocolBody) {
  const protocole = new Protocol(
    protocolb.id,
    protocolb.name,
    protocolb.intercure,
    protocolb.nbcures,
    protocolb.details,
    protocolb.indications,
    protocolb.histotype,
    [],
    [],
  )
  const associations: ProtocoleMoleculeAssociation[] = await Promise.all(
    protocolb.molecules.map(async (molecule) => {
      const association = new ProtocoleMoleculeAssociation()
      association.protocol = protocole
      association.journey = molecule.journey
      association.molecule = new Molecule()
      association.molecule.id = molecule.moleculeid

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
