import { Column, PrimaryGeneratedColumn, Entity, OneToOne } from "typeorm"
import { PrepMolecule } from "./PrepMolecule"

@Entity()
export class Vehicule {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: string

  @Column()
  content: string

  @Column()
  volume: string

  @Column()
  finalVolume: string

  @OneToOne(() => PrepMolecule)
  prepMolucule: PrepMolecule
}
