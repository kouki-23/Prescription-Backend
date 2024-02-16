import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { PrepMolecule } from "./PrepMolecule"
import { Bottle } from "./Bottle"
@Entity()
export class BottleUsed {
  @Column("decimal")
  quantityFrac: number

  @Column()
  isFraction: boolean

  @ManyToOne(() => PrepMolecule, (p) => p.bottlesused)
  prepmolecule: PrepMolecule

  @ManyToOne(() => Bottle, (b) => b.bottleused)
  bottles: Bottle
}
