import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('admin/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() productData: any) {
    return this.productService.create(productData);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() productData: any) {
    return this.productService.update(Number(id), productData);
  }

  @Patch(':id/disable')
  disableProduct(@Param('id') id: string) {
    return this.productService.disable(Number(id));
  }
}
