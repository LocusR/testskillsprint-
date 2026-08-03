import { createApp } from './app.js'
import { env } from './config/env.js'
import { logger } from './lib/logger.js'

const app = createApp()

const server = app.listen(env.port, () => {
  logger.info(`Сервер запущено на http://localhost:${env.port}`, {
    env: env.nodeEnv,
    cors: env.corsOrigins,
    besCenterConfigured: Boolean(env.besCenter.apiKey),
  })

  if (!env.besCenter.apiKey) {
    logger.warn(
      'BES_CENTER_API_KEY не заданий — POST /api/candidates відповідатиме 503.',
    )
  }
})

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    logger.info(`Отримано ${signal}, зупиняю сервер`)
    server.close(() => process.exit(0))
  })
}
