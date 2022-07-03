import { IOrder } from 'types/orders'
import {
  IOrderUpdate,
  orderRepository,
} from '../repositories/orders.repository'

class UpdateOrderService {
  async execute(order: IOrderUpdate): Promise<IOrder> {
    return await orderRepository.update(order)
  }
}

export const updateOrderService = new UpdateOrderService()
