// src/modules/products/models/product.model.ts
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProductStatus } from '../enums/product-status.enum';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => ProductStatus)
  status: ProductStatus;
}