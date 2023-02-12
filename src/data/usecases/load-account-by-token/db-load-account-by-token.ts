import { type LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { type AccountModel } from '@/domain/models/account'
import { type Decrypter } from '@/data/protocols/criptography/dencrypter'
import { type LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role: string | undefined): Promise<AccountModel | null> {
    const decryptToken = await this.decrypter.decrypt(accessToken)
    if (decryptToken) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
