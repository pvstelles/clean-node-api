import {
  type Controller,
  type HttpRequest,
  type HttpResponse,
  type LoadSurveyById
} from './save-survey-result-controller-protocols'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'
import { type SaveSurveyResult } from '@/domain/usecases/survey/save-survey-result'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body
      const { accountId } = httpRequest
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (survey) {
        const answers = survey.answers.map(item => item.answer)
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }
      if (!accountId) {
        return forbidden(new Error('Access denied'))
      }
      await this.saveSurveyResult.save({
        accountId,
        surveyId,
        answer,
        date: new Date()
      })
      return ok({})
    } catch (e) {
      return serverError(e)
    }
  }
}
