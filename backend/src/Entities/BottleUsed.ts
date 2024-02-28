import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { PrepMolecule } from "./PrepMolecule"
import { Bottle } from "./Bottle"

@Entity()
export class BottleUsed {
  @PrimaryGeneratedColumn()
  id: number

  @Column("decimal")
  quantityFrac: number

  @Column()
  isFraction: boolean

  @ManyToOne(() => PrepMolecule, (p) => p.bottlesUsed)
  prepMolecule: PrepMolecule

  @ManyToOne(() => Bottle, (b) => b.bottleUsed)
  bottles: Bottle
}
