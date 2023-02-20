import { apiKeyAuthSchema } from '@/main/docs/schemas/api-key-auth-schema'
import { badRequest } from '@/main/docs/components/bad-request'
import { serverError } from '@/main/docs/components/server-error'
import { unauthorized } from '@/main/docs/components/unauthorized'
import { notFound } from '@/main/docs/components/not-found'
import { forbidden } from '@/main/docs/components/forbidden'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden
}
