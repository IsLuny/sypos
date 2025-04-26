import { ColorHexComplex, ColorUtils } from '@sypos/utilities'
import { Optional } from '@sypos/utilities'
import chalk from 'chalk'

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
	more?: { details?: string, tags?: string | string[] }
	commonLabel: string
}

type LoggerPrintMessageFormatter = (data: LoggerPrintMessageFormatterData) => string

interface LoggerFormatOptions { 
	colorize: { badge?: boolean, label?: boolean }, 
	function: LoggerPrintMessageFormatter 
}

export interface LoggerConfig<T extends string> {
	levels: LoggerLevelsConfig<T>
	format?: Optional<LoggerFormatOptions, 'function' | 'colorize'>
}

const printf: LoggerPrintMessageFormatter = ({ label, badge, message }) => `${badge} ${label}: ${message}`

export class Logger {
	levels: LoggerLevelsConfig
	formatOptions: LoggerFormatOptions
	
	constructor(config: LoggerConfig<string>) {
		for(const [level, levelConfig] of Object.entries(config.levels)) {
			(this as any)[level] = this.makeLogger({ ...levelConfig, level })
		}

		this.formatOptions = {
			colorize: config.format?.colorize ?? {},
			function: config.format?.function ?? printf,
		}
	}

	private makeLogger(config: LoggerLevel & { level: string }) {
		return (message: string, more?: LoggerPrintMessageFormatterData['more']) => this._log(config, message, more)
	}

	private _log({ level, ...config }: LoggerLevel & { level: string }, _message: string, more?: LoggerPrintMessageFormatterData['more']) {
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

		const message = this.formatOptions.function({
			badge,
			label,
			level,
			message: _message,
			timestamp: new Date().toISOString(),
			more,
			color: config.color,
			commonLabel,
		})

		console.log(message)
	}
}