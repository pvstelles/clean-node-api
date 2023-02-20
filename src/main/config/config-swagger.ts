import swaggerConfig from '@/main/docs'
import { type Express } from 'express'
import { serve, setup } from 'swagger-ui-express'
export default (app: Express): void => {
  app.use('/api-docs', serve, setup(swaggerConfig))
}
