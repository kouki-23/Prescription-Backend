import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  OneToMany,
  DeleteDateColumn,
} from "typeorm"
import { Vehicule } from "./Vehicule"
import { Cure } from "./Cure"
import { PrepMoleculeHistory } from "./HistoryEntities/PrepMoleculeHistory"
import { ProductUsed } from "./ProductUsed"

// TODO : possiblite to add unite for dose
@Entity()
export class PrepMolecule {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  finalCond: string

  @Column("decimal")
  solventVolume: number

  // can be deleted (can calculate it )
  @Column("decimal")
  finalVolume: number

  // need to be deleted (can calculate it )
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
  validation: 0 | 1 | 2 // 0 : no validation | 1 : medecin | 2 : medecin && pharmacien

  @Column({ default: false })
  finished: boolean

  @Column({ default: false })
  isAdjusted: boolean

  @Column()
  theoreticalDose: number

  @Column()
  perfusionType: string

  @Column()
  isCustom: boolean

  @Column({ nullable: true })
  comment?: string

  @ManyToOne(() => Vehicule)
  vehicule: Vehicule

  @OneToMany(() => ProductUsed, (p) => p.prepMolecule, {
    cascade: true,
  })
  productsUsed: ProductUsed[]

  @ManyToOne(() => Cure, (b) => b.prepMolecule, {
    onDelete: "CASCADE",
  })
  cure: Cure

  @OneToMany(() => PrepMoleculeHistory, (p) => p.prepMolecule)
  prepMoleculeHistory: PrepMoleculeHistory[]

  @DeleteDateColumn()
  deleted_at: Date

  constructor(
    day: number,
    dose: number,
    unite: string,
    perfusionType: string,
    isCustom: boolean,
    cure: Cure,
    productsUsed: ProductUsed[],
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
    this.productsUsed = productsUsed
    this.perfusionType = perfusionType
    this.cure = cure
    this.validation = 0
    this.theoreticalDose = dose
  }
}
