import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { ordersController } from '../controllers/orders.controller'

const ordersRoutes = Router()

ordersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cliente: Joi.string().required(),
      produto: Joi.string().required(),
      valor: Joi.number().required(),
    },
  }),
  ordersController.insertOrder,
)
ordersRoutes.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      cliente: Joi.string(),
      produto: Joi.string(),
      valor: Joi.number(),
      entregue: Joi.boolean(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  ordersController.updateOrder,
)
ordersRoutes.put(
  '/delivered/:id',
  celebrate({
    [Segments.BODY]: {
      entregue: Joi.boolean().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  ordersController.updateDelivered,
)
ordersRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  ordersController.delete,
)
ordersRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  ordersController.showById,
)
ordersRoutes.get(
  '/total/delivered/client/:client',
  celebrate({
    [Segments.PARAMS]: {
      client: Joi.string().required(),
    },
  }),
  ordersController.getTotalDelivered,
)
ordersRoutes.get(
  '/total/delivered/product/:product',
  celebrate({
    [Segments.PARAMS]: {
      product: Joi.string().required(),
    },
  }),
  ordersController.getTotalDeliveredByProduct,
)
ordersRoutes.get(
  '/delivered/products/more/delivered',
  ordersController.getMoreDelivered,
)

export { ordersRoutes }
