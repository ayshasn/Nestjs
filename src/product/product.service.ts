import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { ProductRepository } from "./product.repository";

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  create(product: Partial<Product>) {
    return this.productRepository.createProduct(product);
  }

  //   update(id: number, product: Partial<Product>) {
  //     return this.productRepository.update(id, product);
  //   }

  async update(id: number, productData: Partial<Product>) {
    return this.productRepository.updateProduct(id, productData);
  }


  // disable(id: number) {
  //   return this.productRepository.update(id, { isActive: false });
  // }

async disable(id: number) {
  return this.productRepository.disableProduct(id);
}

}
