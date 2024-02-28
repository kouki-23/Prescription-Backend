import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { DataHistory } from "./DataHistory"

export enum UserRole {
  ADMIN = "admin",
  MEDECIN = "medecin",
  PHARMACIEN = "pharmacien",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @Column({
    type: "enum",
    enum: UserRole,
  })
  role: UserRole

  @Column({ nullable: true })
  serviceType?: string

  @OneToMany(() => DataHistory, (datahistory) => datahistory.user)
  dataHistory: DataHistory[]
}
