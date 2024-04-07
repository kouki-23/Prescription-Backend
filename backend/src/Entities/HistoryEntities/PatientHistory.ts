import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { Patient } from "../Patient"
import { History, HistoryActions } from "./History"
import { DifferenceObject } from "../../Utils/helpers"

@Entity()
export class PatientHistory extends History<Patient> {
  @ManyToOne(() => Patient, (p) => p.patientHistory)
  @JoinColumn({ name: "patientId" })
  patient: Patient

  @Column()
  patientId: number

  constructor(
    payload: DifferenceObject<Patient>,
    userId: number,
    patientId: number,
    action: HistoryActions,
  ) {
    super(payload, userId, action)
    this.patientId = patientId
  }
}
