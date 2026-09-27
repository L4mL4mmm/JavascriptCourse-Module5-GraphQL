// src/modules/orders/dto/create-order-item.input.ts
import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateOrderItemInput {
  @Field()
  productId: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  unitPrice: number;
}

// src/modules/orders/dto/create-order.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { CreateOrderItemInput } from './create-order-item.input';

@InputType()
export class CreateOrderInput {
  @Field()
  customerName: string;

  @Field(() => [CreateOrderItemInput])
  items: CreateOrderItemInput[];
}