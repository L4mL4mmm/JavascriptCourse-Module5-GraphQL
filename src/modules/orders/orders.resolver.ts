// src/modules/orders/orders.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateOrderInput } from './dto/create-order.input';
import { Order } from './models/order.model';

@Resolver()
export class OrdersResolver {
  @Mutation(() => Order)
  createOrder(@Args('input') input: CreateOrderInput) {
    return {
      id: 'ord_999',
      customerName: input.customerName,
      items: input.items,
      totalAmount: input.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0),
    };
  }
}