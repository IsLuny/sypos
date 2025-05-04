import { BaseCustomError } from '../base-custom-error'

export class ForbiddenError extends BaseCustomError {
	constructor(
		message: string,
		description = 'Você não tem permissão para acessar este recurso.'
	) {
		super(message, description, 403, 'Forbidden')
	}
}
