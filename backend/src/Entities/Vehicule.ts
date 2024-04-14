import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm"
import { PrepMolecule } from "./PrepMolecule"

@Entity()
export class Vehicule {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: string // Poche | Flacon

  @Column()
  content: string

  @Column()
  volume: number

  @Column({ nullable: true })
  PVC: boolean

  @OneToMany(() => PrepMolecule, (prepMolucule) => prepMolucule.vehicule)
  prepMolucule: PrepMolecule[]
}
