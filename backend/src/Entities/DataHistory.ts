import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Patient } from "./Patient"
import { User } from "./User"

@Entity()
export class DataHistory {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: string

  @Column()
  value: string

  @Column()
  date: Date

  @ManyToOne(() => Patient, (patient) => patient.dataHistory)
  patient: Patient

  @ManyToOne(() => User, (user) => user.dataHistory)
  user: User
}
