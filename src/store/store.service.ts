import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Store } from "./store.entity";
import { CreateStoreDto } from "./dto/create-store.dto";
import { PaginationQueryDto } from "./dto/pagination-query.dto";

@Injectable()
export class StoreService {
  storeRepo: any;
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

async findAll( query: PaginationQueryDto) {
  const page = query.page || 1;
  const limit = query.limit || 10;
  const [stores, total] = await this.storeRepository.findAndCount({
  select: ["id", "name", "location", "category"],
  skip: (page - 1) * limit,
  take: limit,
});
  return { data: stores, total}
}


  async getStoreByIdWithProducts(id: number) {
    const store = await this.storeRepository.findOne({
      where: { id },
      relations: ["storeProducts", "storeProducts.product"], // Load products through join table
    });

    if (!store) {
      throw new NotFoundException("Store not found");
    }

    // Extract products from storeProducts
    const products = store.storeProducts.map((sp) => sp.product);

    return store;
    //   store: {
    //     id: store.id,
    //     name: store.name,
    //     location: store.location,
    //     category: store.category,
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //     // field: store.field,
    //   },
    //   // message: "Some of the products in this store are:",
    //   products: products.map((p) => ({
    //     id: p.id,
    //     name: p.name,
    //     description: p.description,
    //     price: p.price,
    //     isActive: p.isActive,
    //     stock: p.storeProducts
    //   })),
    // };
  }

  async createStore(createStoreDto: CreateStoreDto): Promise<Store> {
    const newStore = this.storeRepository.create(createStoreDto);
    return this.storeRepository.save(newStore);
  }
}
