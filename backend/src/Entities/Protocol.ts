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

  @ManyToMany(() => Molecule, (m) => m.protocole)
  @JoinTable()
  molecule: Molecule[]

  @OneToMany(() => ProtocolAssociation, (pA) => pA.protocol)
  protocolAssociation: ProtocolAssociation[]
}
