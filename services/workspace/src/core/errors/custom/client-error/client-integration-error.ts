import { BaseCustomError } from '../base-custom-error'

export class ClientIntegrationError extends BaseCustomError {
	constructor(
		message: string,
		description = 'Erro na integração com o afiliado durante o processamento da venda.'
	) {
		super(message, description, 500, 'Torres')
	}
}
