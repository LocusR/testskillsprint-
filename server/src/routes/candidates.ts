import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { env, isProduction } from '../config/env.js'
import { forwardCandidate } from '../services/besCenter.js'
import { verifyRecaptcha } from '../services/recaptcha.js'
import { candidateSchema, toFieldErrors } from '../validation/candidate.js'
import { logger } from '../lib/logger.js'

export const candidatesRouter = Router()

const limiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Забагато заявок з цієї адреси. Спробуйте пізніше.' },
})

/**
 * POST /api/candidates
 * Приймає заявку з фронтенду, валідує і форвардить у BES Center.
 */
candidatesRouter.post('/', limiter, async (req, res) => {
  const parsed = candidateSchema.safeParse(req.body)

  if (!parsed.success) {
    res.status(400).json({
      message: 'Перевірте правильність заповнення полів.',
      fieldErrors: toFieldErrors(parsed.error),
    })
    return
  }

  // Капчу перевіряємо до форварду, щоб боти не доходили до BES Center
  const { recaptchaToken, ...candidate } = parsed.data
  const captcha = await verifyRecaptcha(recaptchaToken)

  if (!captcha.ok) {
    logger.warn('Заявку відхилено на капчі', {
      reason: captcha.reason,
      codes: captcha.codes,
    })
    res.status(400).json({
      message: 'Не вдалося підтвердити, що ви не робот. Спробуйте ще раз.',
      fieldErrors: { recaptchaToken: 'Перевірка не пройдена' },
    })
    return
  }

  const result = await forwardCandidate(candidate)

  if (result.ok) {
    logger.info('Заявку передано в BES Center', {
      email: parsed.data.email,
      status: result.status,
    })
    res.status(201).json({ message: 'Заявку прийнято.' })
    return
  }

  logger.error('BES Center відхилив заявку', {
    status: result.status,
    message: result.message,
    body: result.body,
  })

  // 503 — наша власна проблема конфігурації, її віддаємо як є.
  // Решту помилок апстріму згортаємо у 502, щоб не протікали чужі коди.
  const status = result.status === 503 ? 503 : result.status >= 500 ? 502 : 400

  res.status(status).json({
    message:
      status === 503
        ? 'Сервіс тимчасово недоступний. Спробуйте пізніше.'
        : 'Не вдалося надіслати заявку. Спробуйте ще раз або напишіть нам у Telegram.',
    ...(isProduction ? {} : { debug: result.message }),
  })
})
