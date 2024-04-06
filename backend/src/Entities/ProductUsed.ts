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

  @Column("decimal")
  quantityFrac: number

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
    quantityFrac: number,
  ) {
    this.prepMolecule = prepMolecule
    this.productId = productId
    this.quantityFrac = quantityFrac
  }
}
