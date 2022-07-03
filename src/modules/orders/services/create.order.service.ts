import { IOrder } from 'types/orders'
import {
  orderRepository,
  TOrderWithoutId,
} from '../repositories/orders.repository'

class CreateOrderService {
  async execute(order: TOrderWithoutId): Promise<IOrder> {
    return await orderRepository.insert(order)
  }
}

export const createOrderService = new CreateOrderService()
