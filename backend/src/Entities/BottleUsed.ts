import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm"
import { PrepMolecule } from "./PrepMolecule"
import { Bottle } from "./Bottle"
import { Molecule } from "./Molecule"
@Entity()
export class BottleUsed {
  @Column("decimal")
  quantityFrac: number

  @Column()
  isFraction: boolean

  @PrimaryColumn({ type: "int" })
  @ManyToOne(() => PrepMolecule, (p) => p.bottlesused)
  prepmolecule: PrepMolecule

  @PrimaryColumn({ type: "int" })
  @ManyToOne(() => Bottle, (b) => b.bottleused)
  bottles: Bottle
}
