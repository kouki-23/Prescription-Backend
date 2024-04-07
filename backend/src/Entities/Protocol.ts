import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm"
import { ProtocolAssociation } from "./ProtocolAssociation"
import { ProtocoleMoleculeAssociation } from "./ProtocoleMoleculeAssociation"
import { Prescription } from "./Prescription"

//TODO : auto genereated id and change backend/src/Services/protocolService.ts:12
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

  @Column({ default: true })
  isCreated: boolean

  @Column({ default: false })
  disabled: boolean

  @OneToMany(() => ProtocolAssociation, (pA) => pA.protocol)
  protocolAssociation: ProtocolAssociation[]

  @OneToMany(() => ProtocoleMoleculeAssociation, (pm) => pm.protocol, {
    cascade: true,
  })
  protocolMoleculeAssociation: ProtocoleMoleculeAssociation[]

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
    this.protocolAssociation = protocolAssociation
    this.protocolMoleculeAssociation = protocolMoleculeAssociation
  }
}
