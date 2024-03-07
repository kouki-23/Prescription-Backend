import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToMany,
  ManyToOne,
} from "typeorm"
import { Molecule } from "./Molecule"
import { BottleUsed } from "./BottleUsed"

@Entity()
export class Bottle {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: String

  @Column("decimal")
  dosage: number

  @Column("decimal")
  volume: number

  @ManyToOne(() => Molecule, (m) => m.bottles)
  molecule: Molecule

  @OneToMany(() => BottleUsed, (b) => b.bottles)
  bottleUsed: BottleUsed[]
}
