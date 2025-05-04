import { BaseCustomError } from '../base-custom-error'

export class TokenNotValidatedError extends BaseCustomError {
	constructor(message: string, description = 'Token não validado!') {
		super(message, description, 400, 'Spears')
	}
}
