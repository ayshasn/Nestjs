import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./product.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(product: Partial<Product>) {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  //   update(id: number, product: Partial<Product>) {
  //     return this.productRepository.update(id, product);
  //   }

  async update(id: number, productData: Partial<Product>) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const updatedProduct = Object.assign(product, productData);
    return this.productRepository.save(updatedProduct);
  }

  // disable(id: number) {
  //   return this.productRepository.update(id, { isActive: false });
  // }

  async disable(id: number) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      return { message: `Product with ID ${id} not found.` };
    }

    if (!product.isActive) {
      return { message: `Product with ID ${id} is already disabled.` };
    }

    await this.productRepository.update(id, { isActive: false });

    return { message: `Product with ID ${id} has been disabled successfully.` };
  }
}
