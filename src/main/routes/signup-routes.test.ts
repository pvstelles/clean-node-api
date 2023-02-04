import request from 'supertest'

import app from '../config/app'
describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Paulo Victor',
        email: 'paulo.telles@rockapps.com.br',
        password: 'paulo',
        passwordConfirmation: 'paulo'
      })
      .expect(200)
  })
})
