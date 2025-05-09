import chalk from 'chalk'

import { createLogger } from '@sypos/logger'

import { debug } from '@/env'

const setupLogger = () => {
	const logger = createLogger({
		levels: { 
			info: { logLevel: 'info', badge: '◉', color: '#32CD32' },
			debug: { logLevel: 'debug', badge: '◉', color: 'blue' },
			warn: { logLevel: 'warn', badge: '◉', color: '#FFA500' },
			error: { logLevel: 'error', badge: '◉', color: '#FF4500' },
			fatal: { logLevel: 'error', badge: '✘', color: '#FF0000' },
		},
		debug,
		format: {
			colorize: { badge: true, label: true },
			function: ({ badge, label, message, timestamp, commonLabel, more = {} }) => {
				const tag = more.tags ? (typeof more.tags === 'string' ? more.tags : more.tags.join(', ')) : ''
            
				return ` ${badge} ${chalk.hex('#2c3e50')(timestamp)} ${process.pid} ${chalk.underline(label.toLowerCase())}${' '.repeat(commonLabel.length >= 5 ? 0 : 5 - commonLabel.length)} --- ${tag ? `[${chalk.hex('#4682B4')(`${tag}`)}]:` : ''} ${message}`
			},
		},
	})

	global.__logger = logger

	return logger
}

export const logger = global.__logger ?? setupLogger()
export type Logger = ReturnType<typeof setupLogger>