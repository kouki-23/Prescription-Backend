import {
  Column,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Molecule } from "./Molecule"

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

  @ManyToMany(() => Molecule)
  @JoinTable({ name: "ProtocolMoleculeAssociation" })
  categories: Molecule[]
}
