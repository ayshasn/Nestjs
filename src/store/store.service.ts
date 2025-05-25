import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './store.entity';
import { CreateStoreDto } from './dto/create-store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  findAll(): Promise<Store[]> {
    return this.storeRepository.find();
  }

async getStoreById(id: number): Promise<Store | null> {
  return this.storeRepository.findOneBy({ id });
}

  async createStore(createStoreDto: CreateStoreDto): Promise<Store> {
    const newStore = this.storeRepository.create(createStoreDto);
    return this.storeRepository.save(newStore);
  }

}
