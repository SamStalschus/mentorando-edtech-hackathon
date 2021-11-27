import { Router } from 'express'

import userController from '../controllers/userController.js'
import ensureAuthenticate from '../shared/middlewares/ensureAuthenticate.js'

const usersRoutes = Router()
usersRoutes.post('/signup/:code', userController.create)
usersRoutes.get('/', ensureAuthenticate, userController.login)
usersRoutes.get('/signup/:code', userController.signup)
usersRoutes.get('/mentoring', ensureAuthenticate, userController.mentoringScreen)
usersRoutes.post('/availabletime', ensureAuthenticate, userController.createAvailableTimes)

export { usersRoutes }