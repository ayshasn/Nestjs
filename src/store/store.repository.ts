// src/store/store.repository.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Store } from "./store.entity";

@Injectable()
export class StoreRepository extends Repository<Store> {
  constructor(private dataSource: DataSource){
    super(Store, dataSource.createEntityManager())
  }


  findAll(page: number, limit: number) {
    return this.findAndCount({
      select: ["id", "name", "location", "category"],
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findByIdWithProducts(id: number) {
    return this.findOne({
      where: { id },
      relations: ["storeProducts", "storeProducts.product"],
    });
  }

  createStore(store: Partial<Store>) {
    const newStore = this.create(store);
    return this.save(newStore);
  }
}
