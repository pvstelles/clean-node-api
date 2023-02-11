import env from '../../../../config/env'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository'
import { JwtAdapter } from '../../../../../infra/criptography/jwl-adapter/jwt-adapter'
import { type LoadAccountByToken } from '../../../../../domain/usecases/load-account-by-token'
import { DbLoadAccountByToken } from '../../../../../data/usecases/load-account-by-token/db-load-account-by-token'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
