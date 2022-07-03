import { orderRepository } from '../repositories/orders.repository'

interface ICountProducts {
  [property: string]: number
}
interface IProduct {
  name: string
  deliveryNumber: number
}

class GetMoreDeliveredOrderService {
  async execute(): Promise<string[]> {
    const orders = await orderRepository.getDeliveredOrders()
    const products: ICountProducts = {}
    orders.forEach(order => {
      if (!products[order.produto]) {
        products[order.produto] = 1
      } else {
        products[order.produto] += 1
      }
    })
    const deliveredProducts: IProduct[] = []
    for (const product in products) {
      deliveredProducts.push({
        name: product,
        deliveryNumber: products[product],
      })
    }
    return deliveredProducts
      .sort((a, b) => b.deliveryNumber - a.deliveryNumber)
      .map(product => `${product.name} - ${product.deliveryNumber}`)
  }
}

export const getMoreDeliveredOrderService = new GetMoreDeliveredOrderService()
