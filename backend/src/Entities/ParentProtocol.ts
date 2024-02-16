import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from "typeorm"
import { Protocol } from "./Protocol"
import { ProtocolAssociation } from "./ProtocolAssociation"
@Entity()
export class ParentProtocol {
  @PrimaryColumn()
  id: number

  @Column()
  name: String

  @OneToMany(() => ProtocolAssociation, (pro) => pro.parentProtocol)
  protocolAssociation: ProtocolAssociation[]
}
