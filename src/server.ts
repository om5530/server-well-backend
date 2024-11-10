import dotenv from 'dotenv'
dotenv.config()

import { createServer } from 'http'

import { app } from './app'
import { sequelize } from './datasource'

if (process.env.NODE_ENV !== 'test') {
  console.log('Starting New Relic')
}

const server = createServer(app)

if (process.env.NODE_ENV !== 'test') {
  sequelize
    .authenticate()
    .then(() => {
      console.log('DB Connected')
    })
    .catch((err: Error) => {
      console.error('Error during DB initialization:', err)
      process.exit(1)
    })
}

server.listen(process.env.PORT ?? 3000, () => {
  console.log(`Started ${process.env.NODE_ENV ?? 'development'} server on port ${process.env.PORT ?? 3000}...`)
})
