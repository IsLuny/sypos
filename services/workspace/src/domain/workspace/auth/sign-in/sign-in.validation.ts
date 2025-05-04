import { z } from 'zod'

export const signInPayloadBodySchema = z.object({
	sign_in_key: z.string(),
	password: z.string(),
})