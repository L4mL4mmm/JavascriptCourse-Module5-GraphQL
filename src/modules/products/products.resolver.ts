// src/modules/products/products.resolver.ts
import { Resolver, Mutation, Subscription, Args } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Product } from './models/product.model';
import { ProductStatus } from './enums/product-status.enum';

const pubSub = new PubSub();
const PRODUCT_CREATED_TRIGGER = 'PRODUCT_CREATED';

@Resolver(() => Product)
export class ProductsResolver {
  @Mutation(() => Product)
  async createProduct(@Args('name') name: string): Promise<Product> {
    const newProduct: Product = {
      id: String(Date.now()),
      name,
      status: ProductStatus.IN_STOCK,
    };

    // Bắn sự kiện realtime
    await pubSub.publish(PRODUCT_CREATED_TRIGGER, { productCreated: newProduct });

    return newProduct;
  }

  @Subscription(() => Product, {
    name: 'productCreated',
  })
  productCreated() {
    return pubSub.asyncIterableIterator(PRODUCT_CREATED_TRIGGER);
  }
}