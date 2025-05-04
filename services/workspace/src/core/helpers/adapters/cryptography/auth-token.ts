import { env } from '@/env'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'

export const AuthTokenAdapter = new JwtAdapter(env.JWT_SECRET)