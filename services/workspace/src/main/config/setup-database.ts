import { prisma } from '@/core/repositories/database/prisma'

export const setupDatabase = async() => {
	await prisma.$connect()
}