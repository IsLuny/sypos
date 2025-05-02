import { v4 as uuid } from 'uuid'

import { env } from '../src/env'
import { CryptoAdapter } from '../src/infra/cryptography/crypto-adapter'
import { PrismaClient } from './client'

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: env.POSTGRES_URL,
		},
	},
})

const passwordCrypto = new CryptoAdapter(env.PASSWORD_SECRET, env.PASSWORD_IV, 'aes-256-gcm')

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
			workspace_id: workspaceId,
			auth: {
				create: {
					sign_in_key: 'devs@isluny.org',
					password_hash: passwordCrypto.encrypt('1511'),
					workspace_id: workspaceId,
				},
			},
		},
	})
}

main().then(() => {
	prisma.$disconnect()
})