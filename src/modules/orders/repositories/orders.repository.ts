import { IOrder } from 'types/orders'
import { promises as fs } from 'fs'
import { IData } from 'types/data'
import { AppError } from 'shared/errors/AppError'
import { isUndefineOrNull } from 'helper/isUndefineOrNull'

export type TOrderWithoutId = Pick<
  IOrder,
  'cliente' | 'entregue' | 'produto' | 'valor'
>

export interface IOrderUpdate {
  id: number
  cliente?: string
  produto?: string
  valor?: number
  entregue?: boolean
}
const { readFile, writeFile } = fs

class OrderRepository {
  async insert(order: TOrderWithoutId): Promise<IOrder> {
    const data: IData = JSON.parse((await readFile(FILE_NAME)).toString())
    const newOrder: IOrder = {
      id: data.nextId,
      ...order,
      timestamp: new Date().toISOString(),
    }
    data.nextId++
    data.pedidos.push(newOrder)
    await writeFile(FILE_NAME, JSON.stringify(data, null, 2))
    return newOrder
  }
  async findById(id: number): Promise<IOrder> {
    const data: IData = JSON.parse((await readFile(FILE_NAME)).toString())
    const order = data.pedidos.find(order => order.id === id)
    if (!order) {
      throw new AppError('This order does not exist', 404)
    }
    return order
  }
  async getDeliveredOrders(): Promise<IOrder[]> {
    const data: IData = JSON.parse((await readFile(FILE_NAME)).toString())
    return data.pedidos.filter(order => order.entregue)
  }
  async getTotalDeliveredByClient(cliente: string): Promise<number> {
    const data: IData = JSON.parse((await readFile(FILE_NAME)).toString())
    let total = 0
    data.pedidos.forEach(order => {
      if (order.cliente === cliente && order.entregue) {
        total += order.valor
      }
    })
    return total
  }
  async getTotalDeliveredByProduct(produto: string): Promise<number> {
    const data: IData = JSON.parse((await readFile(FILE_NAME)).toString())
    let total = 0
    data.pedidos.forEach(order => {
      if (order.produto === produto && order.entregue) {
        total += order.valor
      }
    })
    return total
  }
  async update(order: IOrderUpdate): Promise<IOrder> {
    const data: IData = JSON.parse((await readFile(FILE_NAME)).toString())
    const selectedIndex = data.pedidos.findIndex(item => item.id === order.id)

    if (selectedIndex < 0) {
      throw new AppError('Order does not exist', 404)
    }
    const orderToUpdate = data.pedidos[selectedIndex]
    if (!isUndefineOrNull(order.cliente)) {
      orderToUpdate.cliente = order.cliente!
    }
    if (!isUndefineOrNull(order.produto)) {
      orderToUpdate.produto = order.produto!
    }
    if (!isUndefineOrNull(order.valor)) {
      orderToUpdate.valor = order.valor!
    }
    if (!isUndefineOrNull(order.entregue)) {
      orderToUpdate.entregue = order.entregue!
    }

    await writeFile(FILE_NAME, JSON.stringify(data, null, 2))

    return orderToUpdate
  }
  async delete(id: number): Promise<number> {
    const data: IData = JSON.parse((await readFile(FILE_NAME)).toString())
    const newPedidos = data.pedidos.filter(item => item.id !== id)
    data.pedidos = newPedidos
    await writeFile(FILE_NAME, JSON.stringify(data, null, 2))

    return id
  }
}

export const orderRepository = new OrderRepository()
