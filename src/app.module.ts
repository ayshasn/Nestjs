import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';
import { Store } from './store/store.entity';
import { Product } from './product/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'store_system',
      entities: [Store, Product],
      synchronize: true,
    }),
    StoreModule,
    ProductModule,
  ],
})
export class AppModule {}
