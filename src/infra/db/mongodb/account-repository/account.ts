import { type AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { type AddAccountModel } from '../../../../domain/usecases/add-account'
import { type AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'
import { type InsertOneResult } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result: InsertOneResult<Document> = await accountCollection.insertOne(accountData)
    const account: any = await accountCollection.findOne({ _id: result.insertedId })
    return MongoHelper.map(account)
  }
}
