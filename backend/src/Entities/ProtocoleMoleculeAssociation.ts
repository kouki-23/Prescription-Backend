import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Molecule } from "./Molecule"
import { Protocol } from "./Protocol"

@Entity()
export class ProtocoleMoleculeAssociation {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  day: number

  @Column("decimal")
  dose: number

  @Column()
  unite: string

  @ManyToOne(
    () => Molecule,
    (molecule) => molecule.protocoleMoleculeAssociation,
  )
  molecule: Molecule

  @ManyToOne(() => Protocol, (protocol) => protocol.protocolMoleculeAssociation)
  protocol: Protocol
}
