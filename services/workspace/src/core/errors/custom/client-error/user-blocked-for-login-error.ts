import { BaseCustomError } from '../base-custom-error'

export class UserBlockedForLoginError extends BaseCustomError {
	constructor(message: string, description = 'Usuário bloqueado para login.') {
		super(message, description, 401, 'Deep')
	}
}
