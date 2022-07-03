import { IOrder } from 'types/orders'
import { orderRepository } from '../repositories/orders.repository'

class ShowByIdOrderService {
  async execute(id: number): Promise<IOrder> {
    return await orderRepository.findById(id)
  }
}

export const showByIdOrderService = new ShowByIdOrderService()
