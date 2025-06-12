import { StoreProduct } from "src/store-product/store-product.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => StoreProduct, (storeProduct) => storeProduct.store)
  storeProducts: StoreProduct[];
  product: any;
  price: any;
  stock: any;
  // field: any;
}
