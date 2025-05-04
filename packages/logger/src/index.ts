export * from './logger-class'

import { LoggerConfig, Logger } from './logger-class'

type LoggerLogFunction = (message: unknown, more?: { details?: string | object, tags?: string | string[], depth?: number }) => void

type LoggerMethods<T extends string> = Record<T, LoggerLogFunction>

const Resource: new <T extends string>(attr: LoggerConfig<T>) => Logger & LoggerMethods<T> = Logger as any

export const createLogger = <T extends string>(config: LoggerConfig<T>) => {
	return new Resource<T>(config)
}