import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Protocol } from "./Protocol"
import { ParentProtocol } from "./ParentProtocol"

@Entity()
export class ProtocolAssociation {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  order: number

  @ManyToOne(() => ParentProtocol, (parent) => parent.protocolAssociation)
  parentProtocol: ParentProtocol

  @ManyToOne(() => Protocol, (pro) => pro.protocolAssociation)
  protocol: Protocol
}
