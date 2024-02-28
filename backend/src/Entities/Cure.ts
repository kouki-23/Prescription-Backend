import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Prescription } from "./Prescription"
import { PrepMolecule } from "./PrepMolecule"

@Entity()
export class Cure {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  startDate: Date

  @Column()
  state: string

  @ManyToOne(() => Prescription, (pres) => pres.cures)
  prescription: Prescription

  @OneToMany(() => PrepMolecule, (b) => b.cure)
  prepMolecule: PrepMolecule[]
}
