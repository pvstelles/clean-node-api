import {
  type AddAccount,
  type AddAccountModel,
  type AccountModel,
  type Hasher,
  type AddAccountRepository
} from './db-add-account-protocols'
import { type LoadAccountByEmailRepository } from '../../protocols/db/account/load-account-by-email-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel | null> {
    await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return await new Promise(resolve => {
      resolve(account)
    })
  }
}
