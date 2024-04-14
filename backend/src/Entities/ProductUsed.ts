import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { PrepMolecule } from "./PrepMolecule"
import { Product } from "./Product"

@Entity()
export class ProductUsed {
  @PrimaryGeneratedColumn()
  id: number

  // persentage from 0 to 1
  @Column({ type: "decimal", default: 0 })
  frac: number

  @Column({ default: 1 })
  quantity: number

  @ManyToOne(() => PrepMolecule, (p) => p.productsUsed, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "prepMoleculeId" })
  prepMolecule: PrepMolecule

  @Column()
  prepMoleculeId: number

  @ManyToOne(
    () => Product,
    (p) => p.ProductsUsed,

    {
      onDelete: "CASCADE",
    },
  )
  @JoinColumn({ name: "productId" })
  product: Product

  @Column()
  productId: number

  constructor(
    prepMolecule: PrepMolecule,
    productId: number,
    quantity?: number,
    frac?: number,
  ) {
    this.prepMolecule = prepMolecule
    this.productId = productId
    if (quantity) this.quantity = quantity
    if (frac) this.frac = frac
  }
}
