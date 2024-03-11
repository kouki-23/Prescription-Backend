import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm"
import { Vehicule } from "./Vehicule"
import { DetailPrepMolecule } from "./DetailPrepMolecule"
import { BottleUsed } from "./BottleUsed"
import { Cure } from "./Cure"

@Entity()
export class PrepMolecule {
  @PrimaryGeneratedColumn()
  id: number

  //imkaniya titna7a
  @Column("decimal")
  dilutionVolume: number

  @Column()
  finalCond: string

  @Column("decimal")
  solventVolume: number

  @Column("decimal")
  finalVolume: number

  @Column("decimal")
  VolumePA: number

  @Column("decimal")
  dose: number

  @OneToOne(() => Vehicule)
  @JoinColumn()
  vehicule: Vehicule

  @ManyToOne(() => DetailPrepMolecule, (d) => d.prepMolecule)
  details: DetailPrepMolecule

  @OneToMany(() => BottleUsed, (b) => b.prepMolecule)
  bottlesUsed: BottleUsed[]

  @ManyToOne(() => Cure, (b) => b.prepMolecule)
  cure: Cure
}
