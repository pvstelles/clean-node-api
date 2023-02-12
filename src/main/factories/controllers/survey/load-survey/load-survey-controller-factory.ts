import { type Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { LoadSurveysController } from '@/presentation/controller/survey/load-survey/load-surveys-controller'
import { makeDbLoadSurveys } from '@/main/factories/usecases/survey/load-surveys/db-add-survey'

export const makeLoadSurveysController = (): Controller => {
  return makeLogControllerDecorator(new LoadSurveysController(makeDbLoadSurveys()))
}
