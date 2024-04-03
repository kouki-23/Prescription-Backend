import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { User } from "../User"
import { DifferenceObject } from "../../Utils/helpers"

export enum HistoryActions {
  CREATE = "Create",
  UPDATE = "Update",
  DELETE = "Delete",
}

export abstract class History<T> {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User)
  modifiedBy: User

  @CreateDateColumn()
  modifiedAt: Date

  @Column("json")
  payload: DifferenceObject<T>

  @Column({ type: "enum" })
  action: HistoryActions

  constructor(
    payload: DifferenceObject<T>,
    userId: number,
    action: HistoryActions,
  ) {
    const user = new User()
    user.id = userId
    this.modifiedBy = user
    this.payload = payload
    this.action = action
  }
}
