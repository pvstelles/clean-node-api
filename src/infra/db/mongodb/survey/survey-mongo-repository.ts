import { type AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { type AddSurveyModel } from '@/domain/usecases/survey/add-survey'
import { MongoHelper } from '../helpers/mongo-helper'
import { type LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { type SurveyModel } from '@/domain/models/survey'
import { type LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { ObjectId } from 'mongodb'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const result = await surveyCollection.insertOne(surveyData)
    return MongoHelper.map(result.ops[0])
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys: SurveyModel[] = await surveyCollection.find().toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
    return survey && MongoHelper.map(survey)
  }
}
