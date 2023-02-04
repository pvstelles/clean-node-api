import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'
jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise((resolve) => { resolve('hash') })
  }
}))

const saltBcrypt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(saltBcrypt)
}
describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', saltBcrypt)
  })
  test('Should return a hash on success', async () => {
    const saltBcrypt = 12
    const sut = new BcryptAdapter(saltBcrypt)
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})
