import { MongoHelper } from '../helpers/mongo-helper'
import { type Collection } from 'mongodb'
import { LogMongoRepository } from './log-mongo-repository'
import { type LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'

const makeSut = (): LogErrorRepository => {
  return new LogMongoRepository()
}

describe('Log Mongo Repository', () => {
  let errorCollection: Collection
  beforeAll(async () => {
    // @ts-expect-error error no typescript
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })
  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
