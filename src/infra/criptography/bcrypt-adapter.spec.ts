import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'
jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise((resolve) => { resolve('hash') })
  },
  async compare (): Promise<boolean> {
    return await new Promise((resolve) => { resolve(true) })
  }
}))

const saltBcrypt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(saltBcrypt)
}
describe('Bcrypt Adapter', () => {
  test('Should call bcrypt.hash with correct value', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', saltBcrypt)
  })

  test('Should return a hash from bcrypt.hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hash')
  })

  test('Should throws if Bcrypt.hash throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })

  test('Should call compare with correct values', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  test('Should return true if bcrypt.compare is success', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBeTruthy()
  })

  test('Should return false if bcrypt.compare fail', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
      return false
    })
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(false)
  })
})
