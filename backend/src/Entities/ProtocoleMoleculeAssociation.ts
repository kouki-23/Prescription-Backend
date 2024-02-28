import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Molecule } from "./Molecule"
import { Protocol } from "./Protocol"

@Entity()
export class ProtocoleMoleculeAssociation {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  journey: number

  @JoinColumn({ name: "moleculeId" })
  @ManyToOne(
    () => Molecule,
    (molecule) => molecule.protocoleMoleculeAssociation,
  )
  molecule: Molecule

  @JoinColumn({ name: "protocolId" })
  @ManyToOne(() => Protocol, (protocol) => protocol.protocolMoleculeAssociation)
  protocol: Protocol
}
