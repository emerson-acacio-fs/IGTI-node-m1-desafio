import { orderRepository } from '../repositories/orders.repository'

class TotalDeliveredOrderService {
  async execute(cliente: string): Promise<number> {
    return await orderRepository.getTotalDeliveredByClient(cliente)
  }
}

export const totalDeliveredOrderService = new TotalDeliveredOrderService()
