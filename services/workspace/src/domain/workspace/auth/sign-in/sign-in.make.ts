import { PasswordAdapter } from '@/core/helpers/adapters'
import { PrismaAuthRepository } from '@/core/repositories/prisma/auth-user-repository'
import { PrismaUserRepository } from '@/core/repositories/prisma/user-repository'
import { PrismaWorkspaceRepository } from '@/core/repositories/prisma/workspace-repository'

import { SignInUsecase } from './sign-in.usecase'

export function makeSignInUsecase() {
	return new SignInUsecase(
		new PrismaAuthRepository(),
		new PrismaUserRepository(),
		new PrismaWorkspaceRepository(),
		PasswordAdapter
	)
}