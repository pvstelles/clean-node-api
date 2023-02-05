import request from 'supertest'

import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
describe('Login Routes', () => {
  beforeAll(async () => {
    // @ts-expect-error error no typescript
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
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
})
