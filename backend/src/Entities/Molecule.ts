import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToOne,
  OneToMany,
} from "typeorm"
import { DetailPrepMolucule } from "./DetailPrepMolucule"
import { Bottle } from "./Bottle"
import { ProtocoleMoleculeAssociation } from "./ProtocoleMoleculeAssociation"

@Entity()
export class Molecule {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  name: String

  @Column()
  dose: number

  //unkown what is this so is empty for now
  @Column()
  formula: String

  @Column()
  unite: String

  //we already implements this so i think it should get deleted
  @Column()
  prodDay: number

  @Column()
  way: String

  @Column()
  perfusionType: String

  @Column()
  perfusionDuration: String

  // doesn't make any sense why this variable exist
  @Column()
  vehicule: String

  @Column()
  finalVolume: number

  @Column({ nullable: true })
  comment?: String

  @OneToOne(() => DetailPrepMolucule)
  detailsPrepMolecule: DetailPrepMolucule

  @OneToMany(() => Bottle, (b) => b.molecule)
  bottles: Bottle[]

  @OneToMany(() => ProtocoleMoleculeAssociation, (pma) => pma.molecule, {
    onDelete: "CASCADE",
  })
  protocoleMoleculeAssociation: ProtocoleMoleculeAssociation[]
}
