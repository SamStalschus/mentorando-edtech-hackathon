import { Router } from 'express'

import userController from '../controllers/userController.js'

const usersRoutes = Router()

usersRoutes.post('/', userController.create)
usersRoutes.get('/', userController.home)
usersRoutes.get('/mentoring', userController.mentoringScreen)

export { usersRoutes }