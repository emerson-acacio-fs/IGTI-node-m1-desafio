import { orderRepository } from '../repositories/orders.repository'

class TotalDeliveredByProductOrderService {
  async execute(produto: string): Promise<number> {
    return await orderRepository.getTotalDeliveredByProduct(produto)
  }
}

export const totalDeliveredByProductOrderService =
  new TotalDeliveredByProductOrderService()
