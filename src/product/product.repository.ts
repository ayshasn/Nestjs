import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  createProduct(product: Partial<Product>) {
    const newProduct = this.create(product);
    return this.save(newProduct);
  }
    async findById(id: number): Promise<Product | null> {
    return this.findOneBy({ id });
  }

  async updateProduct(id: number, productData: Partial<Product>) {
    const product = await this.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const updated = Object.assign(product, productData);
    return this.save(updated);
  }

  async disableProduct(id: number) {
  const product = await this.findOneBy({ id });

  if (!product) {
    throw new NotFoundException(`Product with ID ${id} not found.`);
  }

  if (!product.isActive) {
    throw new BadRequestException(`Product with ID ${id} is already disabled.`);
  }

  product.isActive = false;
  return this.save(product);
}

}
  // Future DB logic like filtering, search, pagination can go here

