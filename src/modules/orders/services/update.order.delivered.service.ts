import { IOrder } from 'types/orders'
import { orderRepository } from '../repositories/orders.repository'

class UpdateOrderDeliveredService {
  async execute(id: number, entregue: boolean): Promise<IOrder> {
    return await orderRepository.update({
      id,
      entregue,
    })
  }
}

export const updateOrderDeliveredService = new UpdateOrderDeliveredService()
