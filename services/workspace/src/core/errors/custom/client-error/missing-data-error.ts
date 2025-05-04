import { BaseCustomError } from '../base-custom-error'

export class MissingDataError extends BaseCustomError {
	constructor(
		message: string,
		description = 'Erro no processamento. Alguns dados estão faltando para completar a solicitação.'
	) {
		super(message, description, 401, 'Tarantino')
	}
}
