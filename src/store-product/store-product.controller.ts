// src/store-product/store-product.controller.ts

import { Controller, Post, Body, Param, Get, Query } from "@nestjs/common";
import { StoreProductService } from "./store-product.service";
import { CreateStoreProductDto } from "./dto/create-store-product.dto";

@Controller("store-product")
export class StoreProductController {
  constructor(private readonly service: StoreProductService) {}

  @Post()
  async addProductToStore(@Body() dto: CreateStoreProductDto) {
    const result = await this.service.addProductToStore(dto);

    return {
      message: "Product assigned to store successfully",
      data: {
        id: result.id,
        storeId: result.store?.id ?? dto.storeId,
        productId: result.product?.id ?? dto.productId,
        price: result.price,
        stock: result.stock,
        isActive: result.isActive,
      },
    };
  }

  @Get("products-in-store/:storeId")
  getProductsInStore(
    @Param("storeId") storeId: number,
    @Query("page") page = "1",
    @Query("limit") limit = "10",
  ) {
    return this.service.getProductsInStore(storeId, +page, +limit);
  }
}
