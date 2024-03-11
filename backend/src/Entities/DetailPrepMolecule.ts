import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { PrepMolecule } from "./PrepMolecule"
import { Molecule } from "./Molecule"

@Entity()
export class DetailPrepMolecule {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  dci: string

  @Column()
  specialite: string

  @Column("decimal")
  volume: number

  @Column()
  volumeUnite: string

  @Column()
  isReconstruct: boolean

  @Column()
  solventReconstitution: string

  @Column("decimal")
  volumeReconstitution: number

  @Column()
  volumeReconstitutionUnity: string

  @Column()
  conservationReconstitutionFridge: boolean

  @Column()
  dilutionVolume: number

  @Column()
  dilutionVolumeUnite: String

  @Column("decimal")
  minConcentrarion: number

  @Column("decimal")
  maxConcentrarion: number

  @Column()
  concentrationUnite: String

  @Column()
  conservrationDilutionFridge: boolean

  @Column()
  concervationtionPeriodDilution: number

  @Column()
  lightShelter: boolean

  @Column()
  SensivityPVC: boolean

  @OneToMany(() => PrepMolecule, (prep) => prep.details)
  prepMolecule: PrepMolecule[]

  @OneToOne(() => Molecule)
  @JoinColumn()
  molecule: Molecule
}
