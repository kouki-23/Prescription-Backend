import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm"
import { Protocol } from "./Protocol"
import { ParentProtocol } from "./ParentProtocol"
@Entity()
export class ProtocolAssociation {
  @Column()
  order: number

  @PrimaryColumn({ type: "int" })
  @ManyToOne(() => ParentProtocol, (parent) => parent.protocolAssociation)
  parentProtocol: ParentProtocol

  @PrimaryColumn({ type: "int" })
  @ManyToOne(() => Protocol, (pro) => pro.protocolAssociation)
  protocol: Protocol
}
