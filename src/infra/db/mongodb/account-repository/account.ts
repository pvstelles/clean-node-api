import { type AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { type AddAccountModel } from '../../../../domain/usecases/add-account'
import { type AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'
import { type InsertOneResult } from 'mongodb'
import { type LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result: InsertOneResult<Document> = await accountCollection.insertOne(accountData)
    const account: any = await accountCollection.findOne({ _id: result.insertedId })
    return MongoHelper.map(account)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account ? MongoHelper.map(account) : null
  }
}
