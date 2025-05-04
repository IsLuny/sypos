import { BaseCustomError } from '../base-custom-error'

export class RequiredParamError extends BaseCustomError {
	constructor(
		message: string,
		description = 'O parâmetro é obrigatório, mas não foi fornecido. Verifique a solicitação e tente novamente.'
	) {
		super(message, description, 422, '')
	}
}
