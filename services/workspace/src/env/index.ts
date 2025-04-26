import dotenv from 'dotenv'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { z } from 'zod'

import { envSchema } from './env-schema'

export type EnvType = z.infer<typeof envSchema>

function loadEnv(): EnvType {
	let envVars = { ...process.env }
	const envPath = join(process.cwd(), '.env')
	if(existsSync(envPath)) {
		const envConfig = dotenv.parse(readFileSync(envPath))
		envVars = { ...envVars, ...envConfig }
	}

	const result = envSchema.safeParse(envVars)
	if(!result.success) {
		console.error(result.error.format())
		throw new Error('❌ Invalid environment variables.')
	}
	
	const env = result.data

	_G.env = env
	return env
}

export const env: EnvType = _G.env ?? loadEnv()

export const isProduction = env.NODE_ENV === 'production'
export const isDevelopment = env.NODE_ENV === 'development'
export const isLocal = env.NODE_ENV === 'local'
export const debug = env.DEBUG
