import { Column, PrimaryGeneratedColumn } from "typeorm"

export class Protocol {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  intercure: number

  @Column()
  nbCures: number

  @Column()
  details: string

  @Column()
  indications: string

  @Column()
  histoType: string

  @Column()
  isCreated: boolean
}
