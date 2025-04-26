import { z } from 'zod'

const booleanSchema = z
	.string()
	.transform((a) => a === 'true')
	.default('false')
    
export const envSchema = z.object({
	NODE_ENV: z
		.enum(['development', 'test', 'production', 'local'])
		.default('local'),
	HOST: z.string().default('0.0.0.0'),
	PORT: z.coerce.number().default(3000),
	DEBUG: z.coerce.boolean().default(true),

	DATABASE_URL: z.string().optional(),
	POSTGRES_HOST: z.string().default('localhost'),
	POSTGRES_PASSWORD: z.string().default('postgres'),
	POSTGRES_USER: z.string().default('postgres'),
	POSTGRES_PORT: z.coerce.number().default(5432),
	POSTGRES_DB: z.string().default('db-dev'),
})