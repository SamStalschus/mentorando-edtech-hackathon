import express from 'express'
import ejs from 'ejs'
import passport from 'passport'
import session from 'express-session'
import bodyParser from 'body-parser'

import auth from './shared/middlewares/Auth.js'
import createConnection from './shared/infra/mongoose/index.js'
import { router } from './routes/index.js'

createConnection()

auth(passport)

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use(session({
  secret: '123',//configure um segredo seu aqui,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 }//30min
}))

app.use(passport.initialize())
app.use(passport.session())


app.use(express.static(process.cwd() + '/src' + '/public'))
app.set('views', process.cwd() + '/src' + '/public' + '/views')
app.set('view engine', 'pug');


app.use(router)

export { app }