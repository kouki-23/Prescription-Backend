import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Prescription } from "./Prescription"
import { PrepMolecule } from "./PrepMolecule"

export enum CureState {
  EN_COURS = "En cours",
  PREVU = "Prévu",
  TERMINEE = "Terminée",
}

@Entity()
export class Cure {
  @PrimaryGeneratedColumn()
  id: number

  @Column("date")
  startDate: Date

  @Column({
    type: "enum",
    enum: CureState,
  })
  state: CureState

  @ManyToOne(() => Prescription, (pres) => pres.cures, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "prescriptionId" })
  prescription: Prescription

  @Column()
  prescriptionId: number

  @OneToMany(() => PrepMolecule, (b) => b.cure, {
    cascade: true,
  })
  prepMolecule: PrepMolecule[]

  @DeleteDateColumn()
  deleted_at: Date

  constructor(
    startDate: Date,
    state: CureState,
    prescription: Prescription,
    molecules: PrepMolecule[],
  ) {
    // i am creating new Date to avoid refrence problem and changing of date after construction of Cure
    this.startDate = new Date(startDate)
    this.state = state
    this.prescription = prescription
    this.prepMolecule = molecules
  }
}
