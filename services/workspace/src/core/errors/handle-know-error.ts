import { debug } from '@/env'
import { StatusCode } from '@/infra/http/fastify'
import { logger } from '@/logger'

import type { BaseCustomError } from './custom/base-custom-error'
import { type Either, left } from './either'

type ErrorConstructorNotOptional<T> = new (
  message: string,
  description: string
) => T

type ErrorConstructorOptional<T> = new (
  message: string,
  description?: string,
  sendToSentry?: boolean,
  statusCode?: StatusCode
) => T

type ErrorConstructor<T extends BaseCustomError> =
  | ErrorConstructorNotOptional<T>
  | ErrorConstructorOptional<T>

export function handleKnownError<T extends BaseCustomError>(
	ErrorClass: ErrorConstructor<T>,
	message: string,
	description?: string,
	sendToSentry = true,
	statusCode?: StatusCode
): Either<T, never> {
	let error: T

	if(ErrorClass.length === 2) {
		error = new (ErrorClass as ErrorConstructorNotOptional<T>)(
			message,
			description || ''
		)
	} else {
		error = new (ErrorClass as ErrorConstructorOptional<T>)(
			message,
			description,
			sendToSentry,
			statusCode
		)
	}

	if(debug) {
		logger.debug('Known Error: ')
		logger.debug({
			message: error.message,
			description: error.description.toValue(),
			statusCode: error.statusCode,
			tag: error.tag,
		})
	}

	return left(error)
}
