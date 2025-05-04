import { BaseCustomError } from '../base-custom-error'

export class PasswordMismatchError extends BaseCustomError {
	constructor(message: string, description = 'Usuário ou Senha incorretos!') {
		super(message, description, 401, 'Hemingway')
	}
}
