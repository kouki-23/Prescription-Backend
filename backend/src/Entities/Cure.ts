import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { number } from "zod"
import { Prescription } from "./Prescription"
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
}
