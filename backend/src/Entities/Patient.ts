import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { DataHistory } from "./DataHistory"
import { Prescription } from "./Prescription"

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  DMI: number

  @Column()
  index: number

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
  comment?: string

  @Column({ nullable: true })
  serviceType?: string

  @OneToMany(() => DataHistory, (datahistory) => datahistory.patient)
  dataHistory: DataHistory[]

  @OneToMany(() => Prescription, (p) => p.patient)
  prescription: Prescription[]
}
