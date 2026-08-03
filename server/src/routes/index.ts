import { Router } from 'express'
import { candidatesRouter } from './candidates.js'
import { healthRouter } from './health.js'

export const apiRouter = Router()

apiRouter.use('/health', healthRouter)
apiRouter.use('/candidates', candidatesRouter)

// Тут з'являтимуться наступні ресурси:
// apiRouter.use('/posts', postsRouter)
