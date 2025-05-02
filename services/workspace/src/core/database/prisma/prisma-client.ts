import { PrismaClient as DefaultPrismaClient } from '@/../prisma/client'

export class PrismaClient extends DefaultPrismaClient {
	$isConnected = false

	async $ping() {
		const start = Date.now()
		
		await this.$queryRaw`SELECT 1`

		const end = Date.now()

		return end - start
	}

	async $connect() {
		await super.$connect()
		this.$isConnected = true
	}
}