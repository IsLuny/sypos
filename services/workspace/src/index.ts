import { prisma } from '@/infra/database/prisma'

async function main() {
	await prisma.$connect()
}

main()