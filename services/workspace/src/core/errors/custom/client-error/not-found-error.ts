import { BaseCustomError } from '../base-custom-error'

export class NotFoundError extends BaseCustomError {
	constructor(
		message: string,
		description = 'A informação na qual você quer buscar, não está mais presente ou não existe.'
	) {
		super(message, description, 404, 'Lavine')
	}
}
