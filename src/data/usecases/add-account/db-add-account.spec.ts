import { DbAddAccount } from './db-add-account'

describe('DbAddAccount Use case', () => {
  test('Should call Encrypter with correct password', async () => {
    class EncrypterStub {
      async encrypt (): Promise<string> {
        return await new Promise(resolve => { resolve('hash_value') })
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    const encriptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const account = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(account)
    expect(encriptSpy).toHaveBeenCalledWith('valid_password')
  })
})
