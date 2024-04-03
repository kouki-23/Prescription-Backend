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
import { PrepMoleculeHistory } from "./HistoryEntities/PrepMoleculeHistory"

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
  unite: string

  @Column()
  day: number

  @Column()
  duration: number

  //it need to be changed
  @Column()
  time: string

  @Column()
  validation: number // 0 : no validation | 1 : medecin | 2 : medecin && pharmacien

  @Column()
  theoreticalDose: number

  @Column()
  perfusionType: string

  @Column()
  isCustom: boolean

  @Column({ nullable: true })
  comment?: string

  @OneToOne(() => Vehicule)
  @JoinColumn()
  vehicule: Vehicule

  @ManyToOne(() => DetailPrepMolecule, (d) => d.prepMolecule)
  details: DetailPrepMolecule

  @OneToMany(() => BottleUsed, (b) => b.prepMolecule)
  bottlesUsed: BottleUsed[]

  @ManyToOne(() => Cure, (b) => b.prepMolecule, {
    onDelete: "CASCADE",
  })
  cure: Cure

  @OneToMany(() => PrepMoleculeHistory, (p) => p.prepMolecule)
  prepMoleculeHistory: PrepMoleculeHistory[]

  constructor(
    day: number,
    dose: number,
    unite: string,
    perfusionType: string,
    isCustom: boolean,
    cure: Cure,
    details: DetailPrepMolecule,
  ) {
    this.day = day
    this.finalCond = ""
    this.solventVolume = 0
    this.finalVolume = 0
    this.VolumePA = 0
    this.duration = 1
    this.time = "10:00"
    this.isCustom = isCustom
    this.dose = dose
    this.unite = unite
    this.details = details
    this.perfusionType = perfusionType
    this.cure = cure
    this.validation = 0
    this.theoreticalDose = dose
  }
}
