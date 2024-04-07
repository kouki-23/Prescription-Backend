import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Patient } from "./Patient"
import { Cure } from "./Cure"

// UPDATE : removed startDate because we can get it from the first cure
@Entity()
export class Prescription {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  prescriber: string

  @Column()
  protocolName: string

  @Column()
  intercure: number

  @Column()
  clinicalTest: boolean

  @Column()
  primitif: string

  @Column()
  histoType: string

  @Column({ nullable: true })
  comment?: string

  @Column({ nullable: true })
  serviceType?: string

  @ManyToOne(() => Patient, (p) => p.prescription, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "patientId" })
  patient: Patient

  @Column()
  patientId: number

  @OneToMany(() => Cure, (c) => c.prescription, {
    cascade: true,
  })
  cures: Cure[]

  constructor(
    protocolName: string,
    intercure: number,
    prescriber: string,
    clinicalTest: boolean,
    primitif: string,
    histoType: string,
    patientId: number,
    cures: Cure[],
  ) {
    this.protocolName = protocolName
    this.intercure = intercure
    this.prescriber = prescriber
    this.clinicalTest = clinicalTest
    this.patientId = patientId
    this.cures = cures
    this.primitif = primitif
    this.histoType = histoType
  }
}
