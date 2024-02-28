import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
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
