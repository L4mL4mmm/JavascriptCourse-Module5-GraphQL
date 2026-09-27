// src/modules/products/enums/product-status.enum.ts
import { registerEnumType } from '@nestjs/graphql';

export enum ProductStatus {
  IN_STOCK = 'IN_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  DISCONTINUED = 'DISCONTINUED',
}

registerEnumType(ProductStatus, {
  name: 'ProductStatus',
  description: 'Trạng thái tồn kho của sản phẩm',
});