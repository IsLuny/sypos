import { env } from '@/env'
import { CryptoAdapter } from '@/infra/cryptography/crypto-adapter'
import { setupDatabase } from '@/main/config'
import { setupServer } from '@/main/server'

import { logger } from './logger'

export async function main() {
	await setupDatabase()
	await setupServer()

	logger.debug(new CryptoAdapter(env.PASSWORD_SECRET, env.PASSWORD_IV, 'aes-256-gcm').encrypt('password'))
}

if(require.main === module) {
	main()
}