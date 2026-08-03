import { Router } from 'express'
import { env } from '../config/env.js'

export const healthRouter = Router()

healthRouter.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    env: env.nodeEnv,
    uptime: Math.round(process.uptime()),
    // Показує, чи налаштований секрет, не розкриваючи його
    besCenterConfigured: Boolean(env.besCenter.apiKey),
  })
})
