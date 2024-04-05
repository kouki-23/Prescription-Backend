import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import { ProtocolAssociation } from "./ProtocolAssociation"

@Entity()
export class GroupProtocol {
  @PrimaryColumn()
  id: number

  @Column()
  name: String

  @OneToMany(() => ProtocolAssociation, (pro) => pro.groupProtocol)
  protocolAssociation: ProtocolAssociation[]
}
