import { Router } from 'express'
import { ordersRoutes } from 'modules/orders/routes/order.router'

const routes = Router()

routes.use('/orders', ordersRoutes)

export { routes }
