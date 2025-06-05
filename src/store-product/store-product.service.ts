// src/store-product/store-product.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StoreProduct } from "./store-product.entity";
import { Repository } from "typeorm";
import { CreateStoreProductDto } from "./dto/create-store-product.dto";
import { Store } from "../store/store.entity";
import { Product } from "../product/product.entity";

@Injectable()
export class StoreProductService {
  constructor(
    @InjectRepository(StoreProduct)
    private readonly storeProductRepo: Repository<StoreProduct>,
    @InjectRepository(Store)
    private readonly storeRepo: Repository<Store>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async addProductToStore(dto: CreateStoreProductDto) {
    const store = await this.storeRepo.findOne({ where: { id: dto.storeId } });
    const product = await this.productRepo.findOne({
      where: { id: dto.productId },
    });

    if (!store || !product) {
      throw new Error("Invalid store or product ID");
    }

    const storeProduct = this.storeProductRepo.create({
      store,
      product,
      price: dto.price,
      stock: dto.stock,
      isActive: dto.isActive ?? true,
    });

    return this.storeProductRepo.save(storeProduct);
  }

  //   async getProductsInStore(storeId: number) {
  //   return this.storeProductRepo.find({
  //     where: { store: { id: storeId }, isActive: true },
  //     relations: ['product'], // to include product details
  //   });
  // }

  async getProductsInStore(storeId: number, page: number, limit: number) {
    const storeExists = await this.storeRepo.findOne({
      where: { id: storeId },
    });
    if (!storeExists) {
      throw new NotFoundException(`Store with id ${storeId} not found`);
    }

    const [products, total] = await this.storeProductRepo.findAndCount({
      where: { store: { id: storeId }, isActive: true },
      relations: ["product"],
      skip: (page - 1) * limit,
      take: limit,
    });

    if (products.length === 0) {
      return { message: "Products not assigned yet" };
    }

    const data = products.map((sp) => ({
      id: sp.product.id,
      name: sp.product.name,
      description: sp.product.description,
      price: sp.price,
      stock: sp.stock,
      isActive: sp.isActive,
    }));

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
}
