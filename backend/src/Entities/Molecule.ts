import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm"
import { Product } from "./Product"
import { ProtocoleMoleculeAssociation } from "./ProtocoleMoleculeAssociation"

@Entity()
export class Molecule {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @Column()
  way: string

  @Column({ default: false })
  disabled: boolean

  @Column({ nullable: true })
  comment?: string

  @OneToMany(() => Product, (p) => p.molecule)
  products: Product[]

  @OneToMany(() => ProtocoleMoleculeAssociation, (pma) => pma.molecule)
  protocoleMoleculeAssociation: ProtocoleMoleculeAssociation[]

  constructor(name: string, way: string, comment?: string) {
    this.name = name
    this.way = way
    this.comment = comment
  }
}
