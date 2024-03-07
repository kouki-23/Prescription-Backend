import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Patient } from "./Patient"
import { Protocol } from "./Protocol"
import { Cure } from "./Cure"

@Entity()
export class Prescription {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  prescriber: string

  @Column()
  intercure: number

  @Column()
  nbCures: number

  @Column("date")
  startDate: Date

  @Column()
  clinicalTest: boolean

  @Column({ nullable: true })
  comment?: string

  @Column()
  serviceType: string

  @ManyToOne(() => Patient, (p) => p.prescription)
  patient: Patient

  @OneToMany(() => Cure, (c) => c.prescription, {
    cascade: true,
    onDelete: "CASCADE",
  })
  cures: Cure[]

  @ManyToOne(() => Protocol, (p) => p.prescription)
  protocol: Protocol

  constructor(
    prescriber: string,
    intercure: number,
    nbCures: number,
    startDate: Date,
    clinicalTest: boolean,
    serviceType: string,
    patient: Patient,
    protocol: Protocol,
    cures: Cure[],
    comment?: string,
  ) {
    this.prescriber = prescriber
    this.nbCures = nbCures
    this.intercure = intercure
    this.startDate = startDate
    this.clinicalTest = clinicalTest
    this.comment = comment
    this.serviceType = serviceType
    this.patient = patient
    this.protocol = protocol
    this.cures = cures
  }
}
