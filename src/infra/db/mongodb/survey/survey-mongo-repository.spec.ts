import { MongoHelper } from '../helpers/mongo-helper'
import { type Collection } from 'mongodb'
import { SurveyMongoRepository } from './survey-mongo-repository'

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}
let surveyCollection: Collection
describe('Survey Mongo Repository', () => {
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

  describe('add()', () => {
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
  describe('loadAll()', () => {
    test('Should loadAll surveys', async () => {
      await surveyCollection.insertMany([
        {
          question: 'any_question',
          answers: [{ answer: 'any_answer', image: 'any_image' }],
          date: new Date()
        },
        {
          question: 'other_question',
          answers: [{ answer: 'other_answer', image: 'other_image' }],
          date: new Date()
        }
      ])
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(2)
      expect(surveys[0].question).toEqual('any_question')
      expect(surveys[1].question).toEqual('other_question')
    })
  })
})
