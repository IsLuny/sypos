import util from 'node:util'

import { StatusCode } from '@/infra/http/fastify'

export interface CustomError {
  message: string
  description: DescriptionCustom
  statusCode: StatusCode
  tag?: string
}

class DescriptionCustom {
	constructor(private description: string | JSONObject) {
		this.description = description
	}

	ObjectToString() {
		return JSON.stringify(this.description)
	}

	toString() {
		return this.description.toString()
	}

	toValue() {
		return this.description
	}
}

export class BaseCustomError extends Error implements CustomError {
	private _description: DescriptionCustom
	readonly statusCode: StatusCode
	readonly tag?: string

	constructor(
    private _message: string,
    _description: string | JSONObject,
    statusCode: StatusCode = 500,
    tag?: string
	) {
		super()
		this._description = new DescriptionCustom(_description)
		this.statusCode = statusCode
		this.tag = tag
	}
	
	get message() {
		return this._message
	}

	get description() {
		return this._description
	}

	[util.inspect.custom]() {
		return `[${this.constructor.name}] MESSAGE: ${this._message} - (${this.statusCode})`
	}
}
