
import { z } from 'zod'

import { AuthTokenAdapter } from '@/core/helpers/adapters'
import { getUserController } from '@/domain/workspace/user/get-user/get-user.controller'
import { makeFastifyReply } from '@/infra/http/context'
import { FastifyFC } from '@/infra/http/fastify'

export const UsersRoute: FastifyFC = (fastify) => {
	fastify.route({
		url: '/@me',
		method: 'GET',
		schema: {
			tags: ['User'],
			headers: z.object({
				authorization: z.string(),
			}),
		},
		async handler(request, response) {
			const { authorization } = request.headers
			
			const reply = makeFastifyReply(response)

			const jwt = await AuthTokenAdapter.verify(authorization)

			if(jwt.isLeft()) {
				return reply(
					{
						message: jwt.value.name,
						description: jwt.value.message,
					},
					400
				)
			}

			const value = jwt.value

			const result = await getUserController({ 
				Payload: { 
					user_id: value.user_id,
					workspace_id: value.workspace_id,
				},
				reply,
			})
		},
	})
}