import { BaseCustomError } from '../base-custom-error'

export class NotAcceptableError extends BaseCustomError {
	constructor(
		message: string,
		description = 'O formato ou características solicitadas para este recurso não podem ser atendidas pelo servidor.'
	) {
		super(message, description, 406, 'Lennon')
	}
}
