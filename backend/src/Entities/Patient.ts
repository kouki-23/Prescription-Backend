import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm"
import { DataHistory } from "./DataHistory"
import { Prescription } from "./Prescription"

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  DMI: string

  @Column()
  index: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  gender: string

  @Column()
  matrimonial: string

  @Column("date")
  birthDate: Date

  @Column("decimal")
  weight: number

  @Column("decimal")
  height: number

  @Column("decimal")
  bodySurface: number

  @Column("decimal")
  creatinine: number

  @Column()
  clairanceFormula: string

  @Column("decimal")
  clairance: number

  @Column({ nullable: true })
  FEVG: number

  @Column({ nullable: true })
  comment?: string

  @Column({ nullable: true })
  serviceType?: string

  @OneToMany(() => DataHistory, (datahistory) => datahistory.patient)
  dataHistory: DataHistory[]

  @OneToMany(() => Prescription, (p) => p.patient)
  prescription: Prescription[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
