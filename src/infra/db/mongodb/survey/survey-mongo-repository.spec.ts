import { MongoHelper } from '../helpers/mongo-helper'
import { type Collection } from 'mongodb'
import { SurveyMongoRepository } from './survey-mongo-repository'
import { mockAddSurveyData, mockSurveysModel } from '@/domain/test'

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
      await sut.add(mockAddSurveyData())
      const survey = await surveyCollection.findOne({ question: 'any_question' })
      expect(survey).toBeTruthy()
    })
  })
  describe('loadAll()', () => {
    test('Should loadAll surveys', async () => {
      await surveyCollection.insertMany(mockSurveysModel())
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(2)
      expect(surveys[0].question).toEqual('any_question')
      expect(surveys[1].question).toEqual('other_question')
    })
    test('Should loadAll and return empty list', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })
  describe('loadById()', () => {
    test('Should load survey by id on success', async () => {
      const response = await surveyCollection.insertOne(mockAddSurveyData())
      const id = response.ops[0]._id
      const sut = makeSut()
      const survey = await sut.loadById(id)
      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
    })
  })
})
