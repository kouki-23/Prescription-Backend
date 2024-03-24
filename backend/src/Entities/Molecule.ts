import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToOne,
  OneToMany,
} from "typeorm"
import { DetailPrepMolecule } from "./DetailPrepMolecule"
import { Bottle } from "./Bottle"
import { ProtocoleMoleculeAssociation } from "./ProtocoleMoleculeAssociation"

@Entity()
export class Molecule {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: string

  @Column()
  way: string

  @Column({ nullable: true })
  comment?: string

  @OneToOne(() => DetailPrepMolecule)
  detailsPrepMolecule: DetailPrepMolecule

  @OneToMany(() => Bottle, (b) => b.molecule)
  bottles: Bottle[]

  @OneToMany(() => ProtocoleMoleculeAssociation, (pma) => pma.molecule, {
    onDelete: "CASCADE",
  })
  protocoleMoleculeAssociation: ProtocoleMoleculeAssociation[]

  constructor(name: string, way: string, comment?: string) {
    this.name = name
    this.way = way
    this.comment = comment
  }
}
