import { Router } from 'express'

const routes = Router()

routes.get('/orders', (req, res) => {
  res.send('foi')
})

export { routes }
