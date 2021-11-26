import { Router } from 'express'

import scheduleController from '../controllers/scheduleController.js'

const scheduleRoutes = Router()

scheduleRoutes.post('', scheduleController.create)
scheduleRoutes.get('/:id', scheduleController.render)

export { scheduleRoutes }