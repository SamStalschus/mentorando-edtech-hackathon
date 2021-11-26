import { Router } from 'express'
import passport from 'passport'

import { authenticateController } from '../controllers/authenticateController.js'

const sessionRoutes = Router()

const authenticate = new authenticateController()

// sessionRoutes.post(authenticate.handle)

sessionRoutes.get('/', (req, res, next) => {
  if (req.query.fail)
    res.render('login', { message: 'Usuário e/ou senha incorretos!' });
  else
    res.render('login', { message: null });
})


sessionRoutes.post('/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?fail=true'
  })
)

export { sessionRoutes }