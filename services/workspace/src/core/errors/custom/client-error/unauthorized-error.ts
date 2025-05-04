import { BaseCustomError } from '../base-custom-error'

export class UnauthorizedError extends BaseCustomError {
	constructor(
		message: string,
		description = 'Operação não autorizada para este usuário.'
	) {
		super(message, description, 401, 'Stallone')
	}
}
