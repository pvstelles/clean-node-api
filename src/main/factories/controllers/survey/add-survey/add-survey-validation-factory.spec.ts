import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { type Validation } from '@/validation/protocols'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('AddSurveyValidation Factory', () => {
  test('Should call ValidateComposite with all validations ', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
