import { prisma } from '@/core/database'

import { UserRepository } from '../interfaces/user-repository.interface'

export class PrismaUserRepository implements UserRepository {
	async findById(id: string) {
		const data = await prisma.user.findUnique({
			where: {
				id,
			},
		})

		return data ?? null
	}

	async findByEmail(email: string) {
		const data = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		return data ?? null
	}
}