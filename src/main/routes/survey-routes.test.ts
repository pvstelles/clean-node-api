import request from 'supertest'

import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { type Collection } from 'mongodb'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection
describe('Survey Routes', () => {
  beforeAll(async () => {
    // @ts-expect-error error no typescript
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    accountCollection = await MongoHelper.getCollection('accounts')
    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })

  describe('POST /api/surveys', () => {
    test('Should return status code 403 on add-survey without valid accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question Test',
          answers: [
            { answer: 'Answer 1', image: 'http://image-name.com' },
            { answer: 'Answer 2' }
          ]
        })
        .expect(403)
    })
    test('Should return status code 204 on add survey with valid token', async () => {
      const result = await accountCollection.insertOne({
        name: 'Paulo Victor',
        email: 'paulo.telles@rockapps.com.br',
        password: 'paulo',
        passwordConfirmation: 'paulo',
        role: 'admin'
      })
      const accessToken = sign({ id: result.insertedId }, env.jwtSecret)
      await accountCollection.updateOne({ _id: result.insertedId }, { $set: { accessToken } })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question Test',
          answers: [
            { answer: 'Answer 1', image: 'http://image-name.com' },
            { answer: 'Answer 2' }
          ]
        })
        .expect(204)
    })
  })
})
