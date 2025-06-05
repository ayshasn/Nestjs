import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { StoreService } from "./store.service";
import { CreateStoreDto } from "./dto/create-store.dto";

@Controller("stores")
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  getAllStores(@Query("page") page = "1", @Query("limit") limit = "10") {
    return this.storeService.findAll(+page, +limit);
  }

  @Get(":id")
  getStoreById(@Param("id") id: string) {
    return this.storeService.getStoreByIdWithProducts(Number(id));
  }

  @Post()
  createStore(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.createStore(createStoreDto);
  }
}
