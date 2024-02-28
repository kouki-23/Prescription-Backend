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
export class DetailPrepMolucule {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  dci: string

  @Column()
  specialite: string

  @Column("decimal")
  dosage: number

  @Column()
  dosageUnite: string

  @Column("decimal")
  volume: number

  @Column()
  volumeUnite: string

  @Column()
  pretA: string

  @Column()
  solventReconstitution: string

  @Column("decimal")
  volumeReconstitution: number

  @Column()
  volumeReconstitutionUnity: string

  @Column()
  conservationReconstitutionFridge: string

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
  conservrationDilutionFridge: String

  @Column()
  concervationtionPeriodDilution: String

  @Column()
  lightShelter: String

  @Column()
  SensivityPVC: number

  @OneToMany(() => PrepMolecule, (prep) => prep.details)
  prepMolecule: PrepMolecule[]

  @OneToOne(() => Molecule)
  @JoinColumn()
  molecule: Molecule
}
