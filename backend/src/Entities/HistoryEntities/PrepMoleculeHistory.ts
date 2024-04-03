import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { History, HistoryActions } from "./History"
import { PrepMolecule } from "../PrepMolecule"
import { DifferenceObject } from "../../Utils/helpers"

@Entity()
export class PrepMoleculeHistory extends History<PrepMolecule> {
  @ManyToOne(() => PrepMolecule, (p) => p.prepMoleculeHistory)
  @JoinColumn({ name: "prepMoleculeId" })
  prepMolecule: PrepMolecule

  @Column()
  prepMoleculeId: number

  constructor(
    payload: DifferenceObject<PrepMolecule>,
    userId: number,
    prepId: number,
    action: HistoryActions,
  ) {
    super(payload, userId, action)
    this.prepMoleculeId = prepId
  }
}
