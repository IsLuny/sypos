import chalk from 'chalk'
import { inspect } from 'node:util'

import { ColorHexComplex, ColorUtils } from '@sypos/utilities'
import { Optional } from '@sypos/utilities'

import { ChalkColor } from '../typing'

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

type LoggerLevel = {
	badge?: string,
    color?: ChalkColor | ColorHexComplex,
	label?: string
    logLevel: LogLevel
}

export type LoggerLevelsConfig<T extends string = string> = Record<T, LoggerLevel>

interface LoggerPrintMessageFormatterData {
	message: string
	level: string
	label: string
	badge: string
	timestamp: string
	color?: ColorHexComplex | ChalkColor
	more?: { details?: string, tags?: string | string[], depth?: number }
	commonLabel: string
}

type LoggerPrintMessageFormatter = (data: LoggerPrintMessageFormatterData) => string

interface LoggerFormatOptions { 
	colorize: { badge?: boolean, label?: boolean }, 
	function: LoggerPrintMessageFormatter 
}

export interface LoggerConfig<T extends string> {
	debug?: boolean,
	levels: LoggerLevelsConfig<T>
	format?: Optional<LoggerFormatOptions, 'function' | 'colorize'>
}

const printf: LoggerPrintMessageFormatter = ({ label, badge, message }) => `${badge} ${label}: ${message}`

export class Logger {
	levels: LoggerLevelsConfig
	formatOptions: LoggerFormatOptions
	debugActived: boolean
	
	constructor(config: LoggerConfig<string>) {
		for(const [level, levelConfig] of Object.entries(config.levels)) {
			(this as any)[level] = this.makeLogger({ ...levelConfig, level })
		}

		this.debugActived = config.debug ?? true

		this.formatOptions = {
			colorize: config.format?.colorize ?? {},
			function: config.format?.function ?? printf,
		}
	}

	private makeLogger(config: LoggerLevel & { level: string }) {
		return (message: unknown, more?: LoggerPrintMessageFormatterData['more']) => {
			if(!(config.logLevel === 'debug' && !this.debugActived)) {
				this._log(config, message, more)
			}
		}
	}

	private async _log({ level, ...config }: LoggerLevel & { level: string }, _message: unknown, more?: LoggerPrintMessageFormatterData['more']) {
		let colorFn = (string: string) => string

		if(config.color) {
			if(ColorUtils.isHex(config.color)) {
				colorFn = chalk.hex(config.color)
			} else {
				colorFn = chalk[config.color as ChalkColor]
			}
		}

		const commonBadge = config.badge || '◉'
		const badge = this.formatOptions.colorize.label ? colorFn(commonBadge) : commonBadge
		
		const commonLabel = config.label ?? level
		const label = this.formatOptions.colorize?.label ? colorFn(commonLabel) : commonLabel

		let inspectedMessage = _message
		
		if(inspectedMessage instanceof Promise) {
			inspectedMessage = await inspectedMessage
		}

		if(typeof inspectedMessage !== 'string') {
			inspectedMessage = await inspect(inspectedMessage, { depth: more?.depth ?? 0 })
		}

		const messageToPrint = this.formatOptions.function({
			badge,
			label,
			level,
			message: inspectedMessage as string,
			timestamp: new Date().toISOString(),
			more,
			color: config.color,
			commonLabel,
		})

		console.log(messageToPrint)
	}
}