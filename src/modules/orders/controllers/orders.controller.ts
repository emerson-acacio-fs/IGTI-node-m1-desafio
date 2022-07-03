import { Request, Response } from 'express'
import { createOrderService } from '../services/create.order.service'
import { deleteOrderService } from '../services/delete.order.service'
import { getMoreDeliveredOrderService } from '../services/getMoreDelivered.order.service'
import { showByIdOrderService } from '../services/showById.order.service'
import { totalDeliveredOrderService } from '../services/totalDelivered.order.service'
import { totalDeliveredByProductOrderService } from '../services/totalDeliveredByProduct.order.service'
import { updateOrderDeliveredService } from '../services/update.order.delivered.service'
import { updateOrderService } from '../services/update.order.service'

class OrdersController {
  async insertOrder(request: Request, response: Response): Promise<Response> {
    const { cliente, produto, valor } = request.body
    const newOrder = await createOrderService.execute({
      cliente,
      produto,
      valor,
      entregue: false,
    })
    return response.send(newOrder)
  }
  async updateOrder(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { cliente, produto, valor, entregue } = request.body
    const newOrder = await updateOrderService.execute({
      id: parseInt(id),
      cliente,
      produto,
      valor,
      entregue,
    })
    return response.send(newOrder)
  }
  async updateDelivered(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params
    const { entregue } = request.body
    const newOrder = await updateOrderDeliveredService.execute(
      parseInt(id),
      entregue,
    )
    return response.send(newOrder)
  }
  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const deletedId = await deleteOrderService.execute(parseInt(id))
    return response.send({ id: deletedId })
  }
  async showById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const order = await showByIdOrderService.execute(parseInt(id))
    return response.send(order)
  }
  async getTotalDelivered(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { client } = request.params

    const total = await totalDeliveredOrderService.execute(client)
    return response.send({ cliente: client, total })
  }
  async getTotalDeliveredByProduct(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { product } = request.params
    const total = await totalDeliveredByProductOrderService.execute(product)
    return response.send({ produto: product, total })
  }
  async getMoreDelivered(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const total = await getMoreDeliveredOrderService.execute()
    return response.send(total)
  }
}

export const ordersController = new OrdersController()
