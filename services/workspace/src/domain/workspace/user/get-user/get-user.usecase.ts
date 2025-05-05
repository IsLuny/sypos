import { APIUser } from '@sypos/api-types'

import { ZodCustomError } from '@/core/errors/custom/adapters/zod-custom-error'
import { NotFoundError } from '@/core/errors/custom/client-error'
import { Either, left, right } from '@/core/errors/either'
import { handleKnownError } from '@/core/errors/handle-know-error'
import { UserRepository } from '@/core/repositories/interfaces/user-repository.interface'

import { User } from '../user.model'
import { getUserBodySchema } from './get-user.validation'

type GetUserUsecaseResult = Either<
    ZodCustomError | NotFoundError,
    APIUser
>

export class GetUserUsecase {
	constructor(
        private readonly usersRepository: UserRepository
	) {}

	async execute(payload: JSONObject): Promise<GetUserUsecaseResult> {
		const result = getUserBodySchema.safeParse(payload)

		if(!result.success) {
			return left(new ZodCustomError(result.error))
		}

		const data = result.data

		const user = await this.usersRepository.findById(data.user_id)
        
		if(!user || user.workspaceId !== data.workspace_id) {
			return handleKnownError(
				NotFoundError,
				'O identificador fornecido pelo usuário não foi encontrado no banco de dados.',
				'Usuário não encontrado.'
			)
		}

		return right(
			new User(user).toJSON()
		)
	}
}