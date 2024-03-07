import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Prescription } from "./Prescription"
import { PrepMolecule } from "./PrepMolecule"

export enum CureState {
  EN_COURS = "En cours",
  EN_PREVU = "En prévu",
  TERMINEE = "Terminée",
}

@Entity()
export class Cure {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  order: number

  @Column()
  startDate: Date

  @Column({
    type: "enum",
    enum: CureState,
  })
  state: CureState

  @ManyToOne(() => Prescription, (pres) => pres.cures)
  prescription: Prescription

  @OneToMany(() => PrepMolecule, (b) => b.cure)
  prepMolecule: PrepMolecule[]

  constructor(
    moleculeId: number[],
    order: number,
    startDate: Date,
    state: CureState,
    prescription: Prescription,
  ) {
    this.order = order
    this.prescription = prescription
    this.startDate = startDate
    this.state = state
  }
}
