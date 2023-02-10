import request from 'supertest'

import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { type Collection } from 'mongodb'

let surveyCollection: Collection
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
    await surveyCollection.deleteMany({})
  })

  describe('POST /api/surveys', () => {
    test('Should return status code 204 on post survey', async () => {
      await request(app)
        .post('/api/surveys')
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
