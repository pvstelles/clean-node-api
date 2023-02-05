import { type Hasher } from '../../../data/protocols/criptography/hasher'
import bcrypt from 'bcrypt'
import { type HashComparer } from '../../../data/protocols/criptography/hash-comparer'

export class BcryptAdapter implements Hasher, HashComparer {
  private readonly salt
  constructor (salt: number) {
    this.salt = salt
  }

  async hash (value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }

  async compare (value: string, hash): Promise<boolean> {
    const isValid: boolean = await bcrypt.compare(value, hash)
    return isValid
  }
}