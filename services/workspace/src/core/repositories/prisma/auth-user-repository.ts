import { prisma } from '@/core/database'
import { UserAuthDTO } from '@/core/dtos/user-auth.dto'

import { AuthRepository } from '../interfaces/user-auth-repository.interface'

export class PrismaAuthRepository implements AuthRepository {
	async findByUserId(userId: string) {
		return await prisma.userAuth.findUnique({
			where: {
				userId,
			},
		}) ?? null
	}

	async findBySignInKey(signInKey: string) {
		return await prisma.userAuth.findUnique({
			where: {
				signInKey,
			},
		}) ?? null
	}

	async updateByUserId(userId: string, data: Partial<UserAuthDTO>): Promise<UserAuthDTO> {
		return await prisma.userAuth.update({
			where: {
				userId,
			},
			data,
		})
	}
}