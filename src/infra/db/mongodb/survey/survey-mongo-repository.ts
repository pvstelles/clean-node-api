import { type AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { type AddSurveyModel } from '@/domain/usecases/add-survey'
import { MongoHelper } from '../helpers/mongo-helper'
import { type InsertOneResult, type Document } from 'mongodb'
import { type LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { type SurveyModel } from '@/domain/models/survey'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const result: InsertOneResult<Document> = await surveyCollection.insertOne(surveyData)
    const account: any = await surveyCollection.findOne({ _id: result.insertedId })
    return MongoHelper.map(account)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys: SurveyModel[] = await surveyCollection.find().toArray()
    return surveys
  }
}
