import { orderRepository } from '../repositories/orders.repository'

class DeleteOrderService {
  async execute(id: number): Promise<number> {
    return await orderRepository.delete(id)
  }
}

export const deleteOrderService = new DeleteOrderService()
