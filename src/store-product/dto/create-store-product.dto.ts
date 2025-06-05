export class CreateStoreProductDto {
  storeId: number;
  productId: number;
  price: number;
  stock: number;
  isActive?: boolean;
}
