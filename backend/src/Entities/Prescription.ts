import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { DataHistory } from "./DataHistory"
import { Patient } from "./Patient"
import { Protocol } from "./Protocol"
import { Cure } from "./Cure"

//fama mochkla fi inheritance
@Entity()
export class Prescription extends Protocol {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  prescriber: string

  @Column("date")
  startDate: Date

  @Column()
  clinicalTest: boolean

  @Column()
  comment: string

  @Column()
  serviceType: string

  @ManyToOne(() => Patient, (p) => p.prescription)
  patient: Patient

  @OneToMany(() => Cure, (c) => c.prescription)
  cures: Cure[]
}
