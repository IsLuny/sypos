export * from './logger-class'

import { LoggerConfig, Logger } from './logger-class'

type LoggerLogFunction = (message: string, more?: { details?: string | object, tags?: string | string[] }) => void

type LoggerMethods<T extends string> = Record<T, LoggerLogFunction>

const Resource: new <T extends string>(attr: LoggerConfig<T>) => Logger & LoggerMethods<T> = Logger as any

export const createLogger = <T extends string>(config: LoggerConfig<T>) => {
	return new Resource<T>(config)
}