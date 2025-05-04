import { BaseCustomError } from '../base-custom-error'

export class UserAlreadyExistsError extends BaseCustomError {
	constructor(message: string, description = 'Usuário já cadastrado!') {
		super(message, description, 409, 'Orwell')
	}
}
