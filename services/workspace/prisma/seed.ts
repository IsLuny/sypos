import { v4 as uuid } from 'uuid'

import { PasswordAdapter } from '../src/core/helpers/adapters'
import { env } from '../src/env'
import { PrismaClient } from './client'

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: env.POSTGRES_URL,
		},
	},
})

async function main() {
	await prisma.$connect()
    
	const workspaceId = uuid()
	await prisma.workspace.create({
		data: {
			id: workspaceId,
			name: 'IsLuny\'s Coffee',
			features: 0n,
		},
	})

	// Users
	const userId = uuid()
	await prisma.user.create({
		data: {
			id: userId,
			email: 'devs@isluny.org',
			features: 0n,
			name: 'Devs IsLuny',
			role: 'WORKSPACE://OWNER',
			workspaceId,
			auth: {
				create: {
					signInKey: 'devs@isluny.org',
					passwordHash: await PasswordAdapter.hash('password'),
					workspaceId,
				},
			},
		},
	})
}

main().then(() => {
	prisma.$disconnect()
})