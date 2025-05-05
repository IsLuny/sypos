import { PrismaUserRepository } from '@/core/repositories/prisma/user-repository'

import { GetUserUsecase } from './get-user.usecase'

export function makeGetUserUsecase() {
	return new GetUserUsecase(
		new PrismaUserRepository()
	)
}