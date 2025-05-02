import { prisma } from '@/core/database/prisma'

export const setupDatabase = async() => {
	await prisma.$connect()
}