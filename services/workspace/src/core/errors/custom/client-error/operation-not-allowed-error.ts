import { BaseCustomError } from '../base-custom-error'

export class OperationNotAllowedError extends BaseCustomError {
	constructor(message: string, description = 'Operação não permitida.') {
		super(message, description, 406, 'McCartney')
	}
}
