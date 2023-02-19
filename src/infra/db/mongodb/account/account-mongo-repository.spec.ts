import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'
import { type Collection } from 'mongodb'
import { mockAddAccountParams } from '@/domain/test'

let accountCollection: Collection
const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    // @ts-expect-error error no typescript
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const sut = makeSut()
      const account = await sut.add(mockAddAccountParams())
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })
  })
  describe('loadByEmail()', () => {
    test('Should return an account on loadByEmail success', async () => {
      await accountCollection.insertOne(mockAddAccountParams())
      const sut = makeSut()
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })
    test('Should return null if loadByEmail fail', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeFalsy()
    })
  })
  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut()
      const result = await accountCollection.insertOne(mockAddAccountParams())
      const user: any = await accountCollection.findOne({ _id: result.insertedId })
      expect(user.accessToken).toBeFalsy()
      await sut.updateAccessToken(user._id, 'any_token')
      const account = await accountCollection.findOne({ _id: user._id })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe('any_token')
    })
  })
  describe('loadByToken()', () => {
    test('Should return an account by token without role on loadByToken success ', async () => {
      await accountCollection.insertOne({ ...mockAddAccountParams(), accessToken: 'any_token' })
      const sut = makeSut()
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })
    test('Should return an account by token and role admin on loadByToken success ', async () => {
      await accountCollection.insertOne({ ...mockAddAccountParams(), accessToken: 'any_token', role: 'admin' })
      const sut = makeSut()
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })
    test('Should return null on loadByToken with invalid role ', async () => {
      await accountCollection.insertOne({ ...mockAddAccountParams(), accessToken: 'any_token' })
      const sut = makeSut()
      const account = await sut.loadByToken('any_token', 'admin')
      expect(account).toBeFalsy()
    })
    test('Should return an account on loadByToken if is user admin ', async () => {
      await accountCollection.insertOne({ ...mockAddAccountParams(), accessToken: 'any_token', role: 'admin' })
      const sut = makeSut()
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
    })
    test('Should return null if loadByToken fail', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken('any_token')
      expect(account).toBeFalsy()
    })
  })
})
