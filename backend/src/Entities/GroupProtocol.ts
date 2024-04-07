import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import { ProtocolAssociation } from "./ProtocolAssociation"

@Entity()
export class GroupProtocol {
  @PrimaryColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => ProtocolAssociation, (pro) => pro.groupProtocol)
  protocolAssociation: ProtocolAssociation[]
}
