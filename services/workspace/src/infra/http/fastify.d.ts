import { FastifyBaseLogger, FastifyInstance, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

export type FastifyTypedInstance = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    FastifyBaseLogger,
    ZodTypeProvider
>

export type FastifyFC = (fastify: FastifyTypedInstance) => any

interface RequestContextGeneric {
    Payload?: object
    Header?: object
}

export type RequestContext<Args extends RequestContextGeneric> = Args