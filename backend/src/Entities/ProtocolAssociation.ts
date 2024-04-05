import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { Protocol } from "./Protocol"
import { GroupProtocol } from "./GroupProtocol"

@Entity()
export class ProtocolAssociation {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  order: number

  @ManyToOne(() => GroupProtocol, (group) => group.protocolAssociation)
  groupProtocol: GroupProtocol

  @ManyToOne(() => Protocol, (pro) => pro.protocolAssociation)
  protocol: Protocol
}
