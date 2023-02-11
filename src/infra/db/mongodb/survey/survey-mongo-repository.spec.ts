import { MongoHelper } from '../helpers/mongo-helper'
import { type Collection } from 'mongodb'
import { SurveyMongoRepository } from './survey-mongo-repository'

describe('Survey Mongo Repository', () => {
  let surveyCollection: Collection
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

  const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository()
  }

  test('Should return an survey.ts on success', async () => {
    const sut = makeSut()
    await sut.add({
      question: 'any_question',
      answers: [
        { image: 'any_image', answer: 'any_answer' },
        { answer: 'any_answer' }
      ],
      date: new Date()
    })
    const survey = await surveyCollection.findOne({ question: 'any_question' })
    expect(survey).toBeTruthy()
  })
})
