import {Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  getAllStores() {
    return this.storeService.findAll();
  }

  @Get(':id')
  getStoreById(@Param('id') id: string) {
    return this.storeService.getStoreById(Number(id));
  }
  @Post()
  createStore(@Body() createStoreDto: CreateStoreDto) {
    return this.storeService.createStore(createStoreDto);
  }
}
