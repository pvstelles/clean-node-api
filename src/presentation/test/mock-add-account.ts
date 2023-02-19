import { type AddAccount, type AddAccountParams } from '@/domain/usecases/account/add-account'
import { type AccountModel } from '@/domain/models/account'
import { mockAccountModel } from '@/domain/test'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      const fakeAccount = mockAccountModel()
      return await new Promise((resolve) => {
        resolve(fakeAccount)
      })
    }
  }

  return new AddAccountStub()
}
