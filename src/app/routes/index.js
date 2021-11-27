import { Router } from 'express'

import { sessionRoutes } from './authenticate.routes.js'
import { usersRoutes } from './users.routes.js'
import { scheduleRoutes } from './schedule.routes.js'
import ensureAuthenticate from '../shared/middlewares/ensureAuthenticate.js'

const router = Router()

router.use('/login', sessionRoutes)
router.use('', usersRoutes)
router.use('/scheduleEvent', ensureAuthenticate, scheduleRoutes)

export { router }