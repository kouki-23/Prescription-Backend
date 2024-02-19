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
import { DetailPrepMolucule } from "./DetailPrepMolucule"
import { BottleUsed } from "./BottleUsed"
import { Cure } from "./Cure"
@Entity()
export class PrepMolecule {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  dilution: string

  @Column("decimal")
  dilution_volume: number

  @Column()
  finalCound: string

  @Column("decimal")
  solventVolume: number

  @Column("decimal")
  finalVolume: number

  @Column("decimal")
  VolumePA: number

  @OneToOne(() => Vehicule)
  @JoinColumn()
  vehicule: Vehicule

  @ManyToOne(() => DetailPrepMolucule, (d) => d.prepMolecule)
  details: DetailPrepMolucule

  @OneToMany(() => BottleUsed, (b) => b.prepMolecule)
  bottlesUsed: BottleUsed[]

  @ManyToOne(() => Cure, (b) => b.prepMolecule)
  cure: Cure
}
