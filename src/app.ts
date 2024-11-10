import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import path from 'path'

import authRouter  from './routes/auth'
import { sequelize } from './datasource'

export const app = express()

app.set('trust proxy', 1)
app.disable('x-powered-by')

// Configure CORS
const corsOrigin = []

// const corsOptions = {
//   origin: corsOrigin,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// }

// app.use(cors(corsOptions))
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(
  morgan(':method :url :status :response-time ms - :res[content-length]', {
    skip: req => {
      if (req.originalUrl === '/health-check' || req.originalUrl.startsWith('/public/') || req.method === 'OPTIONS') {
        return true
      }
      return false
    },
  }),
)

app.get('/syncDB', async (req: Request, res: Response) => {
  if (['development', 'test'].includes(process.env.NODE_ENV)) {
    await sequelize.sync({ force: true })
    res.send('Database synced')
  } else {
    res.send('Database sync skipped')
  }
})

app.get('/', async (_req: Request, res: Response) => {
  res.render('index', {
    version: '1.0.0',
    environment: process.env.NODE_ENV,
  })
})
app.use('/auth', authRouter)

app.get('/health-check', async (_req: Request, res: Response) => {
  res.status(200).send('Healthy')
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err)
  res.status(501).send({
    message: err.message,
  })
})
