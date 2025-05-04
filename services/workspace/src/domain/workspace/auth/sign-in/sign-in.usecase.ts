import { ZodCustomError } from '@/core/errors/custom/adapters/zod-custom-error'
import { NotFoundError, PasswordMismatchError, UnauthorizedError, UserBlockedForLoginError } from '@/core/errors/custom/client-error'
import { Either, left, right } from '@/core/errors/either'
import { handleKnownError } from '@/core/errors/handle-know-error'
import { calcPermissions } from '@/core/helpers/workspace/calc-permissions'
import { AuthRepository } from '@/core/repositories/interfaces/user-auth-repository.interface'
import { UserRepository } from '@/core/repositories/interfaces/user-repository.interface'
import { WorkspaceRepository } from '@/core/repositories/interfaces/workspace-repository.interface'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'

import { signInPayloadBodySchema } from './sign-in.validation'


type UsecaseResult = Either<
	UnauthorizedError | PasswordMismatchError | ZodCustomError,
	{
		user_id: string
		workspace_id: string
		role: string
		permissions: string
	}
>

export class SignInUsecase {
	constructor(
        private readonly authRepository: AuthRepository,
        private readonly userRepository: UserRepository,
		private readonly workspaceRepository: WorkspaceRepository,
		private readonly passwordHashAdapter: BcryptAdapter
	) {}

	async execute(payload: JSONObject): Promise<UsecaseResult> {
		const parse = signInPayloadBodySchema.safeParse(payload)

		if(!parse.success) {
			return left(new ZodCustomError(parse.error))
		}

		const data = parse.data

		const authInfos = await this.authRepository.findBySignInKey(data.sign_in_key)

		if(!authInfos) {
			return handleKnownError(
				NotFoundError,
				'O e-mail fornecido pelo usuário não foi encontrado no banco de dados.',
				'Usuário ou Senha incorretos!'
			)
		}

		const passwordMatch = await this.passwordHashAdapter.compare(
			authInfos.passwordHash,
      		data.password
		)

		if(!passwordMatch) {
			return handleKnownError(
				PasswordMismatchError,
				'A senha fornecida pelo usuário não é igual à senha registrada no banco de dados.',
				'Usuário ou Senha incorretos!'
			)
		}

		const user = await this.userRepository.findById(authInfos.userId)

		if(!user) {
			return handleKnownError(
				NotFoundError,
				'O e-mail fornecido pelo usuário não foi encontrado no banco de dados.',
				'Usuário ou Senha incorretos!'
			)
		}

		const isUserAccountInactive = user.status === 'INACTIVE'

		if(isUserAccountInactive) {
			return handleKnownError(
				UserBlockedForLoginError,
				'A conta do usuário está inativa e, portanto, impedida de acessar a aplicação.',
				'Esta conta de usuário está inativa.'
			)
		}

		const userPermissions = await calcPermissions(user, [])

		return right({ 
			user_id: user.id,
			workspace_id: user.workspaceId,
			permissions: userPermissions.bits.toString(),
			role: user.role,
		})
	}
}