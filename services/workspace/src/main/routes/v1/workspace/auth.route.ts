import { z } from 'zod'

import { loginUser } from '@/core/domain/workspace/auth/login.controller'
import { FastifyFC } from '@/infra/http/fastify'

export const AuthRoute: FastifyFC = (fastify) => {
	fastify.route({
		url: '/login',
		method: 'POST',
		schema: {
			body: z.object({
				sign_in_key: z.string(),
				password: z.string(),
			}),
			response: {
				200: z.object({
					auth_token: z.string(),
				}),
			},
		},
		async handler(request, reponse) {
			const result = await loginUser({ Payload: { sign_in_key: '', password: '' } })

			return {
				auth_token: result,
			}
		},
	})
}