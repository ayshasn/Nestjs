import { Controller, Post, Body, Patch, Param } from "@nestjs/common";
import { ProductService } from "./product.service";
import { HttpException, HttpStatus } from "@nestjs/common";

@Controller("admin/products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createProduct(@Body() productData: any) {
    return this.productService.create(productData);
  }

  @Patch(":id")
  updateProduct(@Param("id") id: string, @Body() productData: any) {
    return this.productService.update(Number(id), productData);
  }

  // @Patch(':id/disable')
  // disableProduct(@Param('id') id: string) {
  //   return this.productService.disable(Number(id));
  // }

  @Patch(":id/disable")
  async disableProduct(@Param("id") id: string) {
    const response = await this.productService.disable(Number(id));

    if (response.message.includes("not found")) {
      throw new HttpException(response.message, HttpStatus.NOT_FOUND);
    }

    if (response.message.includes("already disabled")) {
      throw new HttpException(response.message, HttpStatus.BAD_REQUEST);
    }

    return {
      statusCode: 200,
      message: response.message,
    };
  }
}
