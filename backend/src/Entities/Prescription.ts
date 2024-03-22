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

// UPDATE : removed startDate because we can get it from the first cure
@Entity()
export class Prescription {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  prescriber: string

  @Column()
  clinicalTest: boolean

  @Column()
  validation: number // 0 : no validation | 1 : medecin | 2 : medecin && pharmacien

  @Column()
  primitif: string

  @Column()
  histoType: string

  @Column({ nullable: true })
  comment?: string

  @Column()
  serviceType: string

  @ManyToOne(() => Patient, (p) => p.prescription, {
    onDelete: "CASCADE",
  })
  patient: Patient

  @OneToMany(() => Cure, (c) => c.prescription, {
    cascade: true,
  })
  cures: Cure[]

  @ManyToOne(() => Protocol, (p) => p.prescription)
  protocol: Protocol

  constructor(
    prescriber: string,
    clinicalTest: boolean,
    primitif: string,
    histoType: string,
    serviceType: string,
    patient: Patient,
    protocol: Protocol,
    cures: Cure[],
    comment?: string,
  ) {
    this.prescriber = prescriber
    this.clinicalTest = clinicalTest
    this.comment = comment
    this.serviceType = serviceType
    this.patient = patient
    this.protocol = protocol
    this.cures = cures
    this.primitif = primitif
    this.histoType = histoType
    this.validation = 0
  }
}
