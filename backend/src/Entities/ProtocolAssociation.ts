import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Protocol } from "./Protocol"
import { ParentProtocol } from "./ParentProtocol"
@Entity()
export class ProtocolAssociation {
  @Column()
  order: number

  @ManyToOne(() => ParentProtocol, (parent) => parent.protocolAssociation)
  parentProtocol: ParentProtocol
}
