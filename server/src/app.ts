import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { env } from './config/env.js'
import { apiRouter } from './routes/index.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

export function createApp() {
  const app = express()

  // За реверс-проксі (nginx/Render/Railway) rate-limit має бачити реальний IP
  app.set('trust proxy', 1)

  app.use(helmet())
  app.use(
    cors({
      origin: env.corsOrigins,
      methods: ['GET', 'POST'],
    }),
  )
  app.use(express.json({ limit: '32kb' }))

  app.use('/api', apiRouter)

  app.use(notFound)
  app.use(errorHandler)

  return app
}
