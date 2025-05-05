
import { FastifyReply } from 'fastify'

import { StatusCode } from './fastify'

type Reply<ReplyData = unknown> = (data: ReplyData, statusCode?: StatusCode) => any

export const makeReply = (callback: (data?: unknown, statusCode?: StatusCode) => any) => {
	return (data: unknown, statusCode?: StatusCode) => callback(data, statusCode)
}

export const makeFastifyReply = (response: FastifyReply) => {
	return makeReply((data: unknown, statusCode?: StatusCode) => {
		if(statusCode) {
			response.status(statusCode)
		}

		response.send(data)
	})
}

interface RequestContextGeneric {
    Payload?: object
    Header?: object
    Reply?: object
}

export interface ReplyError {
	message: string
	description?: string | JSONObject
	tag?: string
}

export type RequestContext<Args extends RequestContextGeneric> = Omit<Args, 'Reply'> & { reply: Reply<Args['Reply'] | ReplyError> }