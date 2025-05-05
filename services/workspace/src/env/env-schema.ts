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

	POSTGRES_HOST: z.string().default('localhost'),
	POSTGRES_PASSWORD: z.string().default('postgres'),
	POSTGRES_USER: z.string().default('postgres'),
	POSTGRES_PORT: z.coerce.number().default(5432),
	POSTGRES_DB: z.string().default('db-dev'),
	COOKIE_SIGNATURE_SECRET: z.string(),
	JWT_SECRET: z.string(),
	PASSWORD_BCRYPT_SALT: z.coerce.number(),
	EXPIRE_TOKEN_IN_SECONDS: z.coerce.number(),
}).transform(envData => ({
	...envData,
	POSTGRES_URL: `postgresql://${envData.POSTGRES_USER}:${envData.POSTGRES_PASSWORD}@${envData.POSTGRES_HOST}:${envData.POSTGRES_PORT}/${envData.POSTGRES_DB}?schema=public`,
}))