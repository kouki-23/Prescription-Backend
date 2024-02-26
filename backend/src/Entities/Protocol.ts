import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Molecule } from "./Molecule"
import { ProtocolAssociation } from "./ProtocolAssociation"
import { ProtocoleMoleculeAssociation } from "./ProtocoleMoleculeAssociation"
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

  @Column()
  details: string

  @Column()
  indications: string

  @Column()
  histoType: string

  @Column()
  isCreated: boolean

  @OneToMany(() => ProtocolAssociation, (pA) => pA.protocol)
  protocolAssociation: ProtocolAssociation[]

  @OneToMany(() => ProtocoleMoleculeAssociation, (pm) => pm.protocol)
  protocolMoleculeAssociation: ProtocoleMoleculeAssociation[]
}
