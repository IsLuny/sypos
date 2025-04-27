import { env } from '@/env'

import { PrismaClient } from './prisma-client'

const createDatabaseClient = () => {
	console.log(env.POSTGRES_URL)
	const prisma = new PrismaClient({
		datasources: {
			db: {
				url: env.POSTGRES_URL,
			},
		},
	})

	global.__prisma = prisma

	return prisma
}

export const prisma = global.__prisma ?? createDatabaseClient()