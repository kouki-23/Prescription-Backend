import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToOne,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm"
import { DetailPrepMolucule } from "./DetailPrepMolucule"
import { Bottle } from "./Bottle"
import { Protocol } from "./Protocol"
@Entity()
export class Molecule {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: String

  @Column()
  dose: String

  @Column()
  formula: String

  @Column()
  unite: String

  @Column()
  prodDay: number

  @Column()
  way: String

  @Column()
  perfusionType: String

  @Column()
  perfusionDuration: String

  @Column()
  vehicule: String

  @Column()
  finalVolume: String

  @Column()
  comment: String

  @OneToOne(() => DetailPrepMolucule)
  detailsPrepMolecule: DetailPrepMolucule

  @OneToMany(() => Bottle, (b) => b.molecule)
  bottles: Bottle[]

  @ManyToMany(() => Protocol, (p) => p.molecule)
  @JoinTable()
  protocole: Protocol[]
}
