import { env } from '@/env'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'

export const PasswordAdapter = new BcryptAdapter(
	env.PASSWORD_BCRYPT_SALT
)