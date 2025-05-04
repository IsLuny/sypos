import { BaseCustomError } from '../base-custom-error'

export class PasswordsDoNotMatchError extends BaseCustomError {
	constructor(
		message: string,
		description = 'A Senha e a Confirmação de Senha não são iguais!'
	) {
		super(message, description, 406, 'Lennon')
	}
}
