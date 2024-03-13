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

// TODO : possiblite to add unite for dose
@Entity()
export class PrepMolecule {
  @PrimaryGeneratedColumn()
  id: number

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

  @Column()
  day: number

  @OneToOne(() => Vehicule)
  @JoinColumn()
  vehicule: Vehicule

  @ManyToOne(() => DetailPrepMolecule, (d) => d.prepMolecule)
  details: DetailPrepMolecule

  @OneToMany(() => BottleUsed, (b) => b.prepMolecule)
  bottlesUsed: BottleUsed[]

  @ManyToOne(() => Cure, (b) => b.prepMolecule)
  cure: Cure

  constructor(
    day: number,
    dose: number,
    cure: Cure,
    details: DetailPrepMolecule,
  ) {
    this.day = day
    this.finalCond = ""
    this.solventVolume = 0
    this.finalVolume = 0
    this.VolumePA = 0
    this.dose = dose
    this.details = details
    this.cure = cure
  }
}
