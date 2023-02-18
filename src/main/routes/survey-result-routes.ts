import { type Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { auth } from '../middlewares/auth'
import {
  makeSaveSurveyResultController
} from '@/main/factories/controllers/survey-result/save-survey-result/save-survey-result-controller-factory'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
}
