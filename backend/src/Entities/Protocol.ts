import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { ProtocolAssociation } from "./ProtocolAssociation"
import { ProtocoleMoleculeAssociation } from "./ProtocoleMoleculeAssociation"
import { Prescription } from "./Prescription"

@Entity()
export class Protocol {
  @PrimaryColumn()
  id: number

  @Column()
  name: string

  @Column()
  intercure: number

  @Column()
  nbCures: number

  @Column({ nullable: true })
  details: string

  @Column()
  indications: string

  @Column()
  histoType: string

  @Column()
  isCreated: boolean

  @OneToMany(() => ProtocolAssociation, (pA) => pA.protocol)
  protocolAssociation: ProtocolAssociation[]

  @OneToMany(() => ProtocoleMoleculeAssociation, (pm) => pm.protocol, {
    onDelete: "CASCADE",
    cascade: true,
  })
  protocolMoleculeAssociation: ProtocoleMoleculeAssociation[]

  @OneToMany(() => Prescription, (p) => p.protocol)
  prescription: Prescription[]

  constructor(
    id: number,
    name: string,
    intercure: number,
    nbCures: number,
    details: string,
    indications: string,
    histoType: string,
    protocolAssociation: ProtocolAssociation[],
    protocolMoleculeAssociation: ProtocoleMoleculeAssociation[],
  ) {
    this.id = id
    this.name = name
    this.intercure = intercure
    this.nbCures = nbCures
    this.details = details
    this.indications = indications
    this.histoType = histoType
    this.isCreated = true
    this.protocolAssociation = protocolAssociation
    this.protocolMoleculeAssociation = protocolMoleculeAssociation
  }
}
