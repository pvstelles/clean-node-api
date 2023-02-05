import request from 'supertest'

import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { type Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection
describe('Login Routes', () => {
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

  describe('POST /signup', () => {
    test('Should return status code 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Paulo Victor',
          email: 'paulo.telles@rockapps.com.br',
          password: 'paulo',
          passwordConfirmation: 'paulo'
        })
        .expect(200)
    })
  })
  describe('POST /login', () => {
    test('Should return status code 200 on signup', async () => {
      const passwordHashed = await hash('paulo', 12)
      await accountCollection.insertOne({
        name: 'Paulo Victor',
        email: 'paulo.telles@rockapps.com.br',
        password: passwordHashed,
        passwordConfirmation: passwordHashed
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'paulo.telles@rockapps.com.br',
          password: 'paulo'
        })
        .expect(200)
    })
  })
})
