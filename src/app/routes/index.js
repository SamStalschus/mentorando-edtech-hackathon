import { Router } from 'express'

import { sessionRoutes } from './authenticate.routes.js'
import { usersRoutes } from './users.routes.js'
import { scheduleRoutes } from './schedule.routes.js'
import ensureAuthenticate from '../shared/middlewares/ensureAuthenticate.js'

const router = Router()

router.use('/login', sessionRoutes)
router.use('', ensureAuthenticate, usersRoutes)
router.use('/scheduleEvent', ensureAuthenticate, scheduleRoutes)
router.use('/signup', ensureAuthenticate, usersRoutes)

export { router }