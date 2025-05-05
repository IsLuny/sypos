import { z } from 'zod'

export const getUserBodySchema = z.object({
	user_id: z.string(),
	workspace_id: z.string(),
})