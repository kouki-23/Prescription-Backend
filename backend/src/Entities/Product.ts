import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Molecule } from "./Molecule"
import { ProductUsed } from "./ProductUsed"

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  specialite: string

  @Column("decimal")
  dosage: number

  // TODO: can be delete because it always mg
  @Column()
  dosageUnite: string

  @Column("decimal")
  volume: number

  // TODO: can be delete because it always ml
  @Column()
  volumeUnite: string

  @Column()
  isReconstruct: boolean

  @Column()
  solventReconstitution: string

  @Column("decimal")
  volumeReconstitution: number

  // TODO: can be delete because it always ml
  @Column()
  volumeReconstitutionUnite: string

  @Column()
  conservationReconstitutionFridge: boolean

  @Column()
  dilutionVolume: number

  @Column()
  dilutionVolumeUnite: string

  @Column("decimal")
  minConcentrarion: number

  @Column("decimal")
  maxConcentrarion: number

  // TODO: can be delete because it always mg/ml
  @Column()
  concentrationUnite: string

  @Column()
  conservrationDilutionFridge: boolean

  @Column()
  concervationtionPeriodDilution: number

  @Column()
  lightShelter: boolean

  @Column()
  SensivityPVC: boolean

  @Column({ default: false })
  disabled: boolean

  @OneToMany(() => ProductUsed, (p) => p.product)
  ProductsUsed: ProductUsed[]

  // DCI
  @ManyToOne(() => Molecule, (m) => m.products)
  @JoinColumn()
  molecule: Molecule
  constructor(
    specialite: string,
    dosage: number,
    dosageUnite: string,
    volume: number,
    volumeUnite: string,
    isReconstruct: boolean,
    solventReconstitution: string,
    volumeReconstitution: number,
    volumeReconstitutionUnite: string,
    conservationReconstitutionFridge: boolean,
    dilutionVolume: number,
    dilutionVolumeUnite: string,
    minConcentration: number,
    maxConcentration: number,
    concentrationUnite: string,
    conservationDilutionFridge: boolean,
    conservationPeriodDilution: number,
    lightShelter: boolean,
    sensitivityPVC: boolean,
    disable: boolean,
  ) {
    this.specialite = specialite
    this.dosage = dosage
    this.dosageUnite = dosageUnite
    this.volume = volume
    this.volumeUnite = volumeUnite
    this.isReconstruct = isReconstruct
    this.solventReconstitution = solventReconstitution
    this.volumeReconstitution = volumeReconstitution
    this.volumeReconstitutionUnite = volumeReconstitutionUnite
    this.conservationReconstitutionFridge = conservationReconstitutionFridge
    this.dilutionVolume = dilutionVolume
    this.dilutionVolumeUnite = dilutionVolumeUnite
    this.minConcentrarion = minConcentration
    this.maxConcentrarion = maxConcentration
    this.concentrationUnite = concentrationUnite
    this.conservrationDilutionFridge = conservationDilutionFridge
    this.concervationtionPeriodDilution = conservationPeriodDilution
    this.lightShelter = lightShelter
    this.SensivityPVC = sensitivityPVC
    this.disabled = disable
  }
}
