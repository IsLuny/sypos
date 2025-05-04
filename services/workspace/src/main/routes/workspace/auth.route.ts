import { z } from 'zod'

import { signInUser } from '@/domain/workspace/auth/sign-in/sign-in.controller'
import { makeFastifyReply } from '@/infra/http/context'
import { FastifyFC } from '@/infra/http/fastify'

export const AuthRoute: FastifyFC = (fastify) => {
	fastify.route({
		url: '/login',
		method: 'POST',
		schema: {
			description: 'User auth route',
			tags: ['Auth', 'Login', 'User'],
			body: z.object({
				sign_in_key: z.string(),
				password: z.string(),
			}),
			response: {
				200: z.any(),
			},
		},
		async handler(request, reponse) {
			const body = request.body

			const reply = makeFastifyReply(reponse)

			const result = await signInUser({ 
				Payload: { 
					sign_in_key: body.sign_in_key, 
					password: body.password, 
				},
				reply,
			})
		},
	})
}