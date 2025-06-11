// src/store-product/store-product.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Store } from "../store/store.entity";
import { Product } from "../product/product.entity";

@Entity("store_product")
export class StoreProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Store, (store) => store.storeProducts, { eager: true })
  store: Store;

  @ManyToOne(() => Product, (product) => product.storeProducts, { eager: true })
  product: Product;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column({ default: true })
  isActive: boolean;

  
}
