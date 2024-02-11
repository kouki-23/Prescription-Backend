import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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

  @Column({ nullable: false })
  username: string

  @Column({ nullable: false })
  password: string

  @Column({
    type: "enum",
    enum: UserRole,
    nullable: false,
  })
  role: UserRole
}
