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

  @Column()
  perfusionType: string

  @ManyToOne(
    () => Molecule,
    (molecule) => molecule.protocoleMoleculeAssociation,
    {
      onDelete: "CASCADE",
    },
  )
  molecule: Molecule

  @ManyToOne(
    () => Protocol,
    (protocol) => protocol.protocolMoleculeAssociation,
    {
      onDelete: "CASCADE",
    },
  )
  protocol: Protocol

  constructor(
    day: number,
    unite: string,
    dose: number,
    perfusionType: string,
    molecule: Molecule,
    protocol: Protocol,
  ) {
    this.day = day
    this.unite = unite
    this.dose = dose
    this.perfusionType = perfusionType
    this.molecule = molecule
    this.protocol = protocol
  }
}
