import type { NextFunction, Request, Response } from 'express'
import { isProduction } from '../config/env.js'
import { logger } from '../lib/logger.js'

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ message: 'Ресурс не знайдено.' })
}

// Express розпізнає обробник помилок за чотирма аргументами — next обов'язковий.
export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const message = error instanceof Error ? error.message : String(error)
  logger.error('Необроблена помилка', { message })

  res.status(500).json({
    message: 'Внутрішня помилка сервера.',
    ...(isProduction ? {} : { debug: message }),
  })
}
